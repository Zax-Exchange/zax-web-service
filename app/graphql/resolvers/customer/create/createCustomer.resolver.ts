import { CreateCustomerInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../../../../postgres/dbconnection";
import stripeService from "../../../../stripe/StripeService";
import emailService from "../../../../gcp/EmailService";
import TokenUtils from "../../../../utils/tokenUtils";

const createCustomer = async (
  parents: any,
  { data }: { data: CreateCustomerInput },
  context: any
) => {
  const {
    name,
    contactEmail,
    logo,
    phone,
    fax,
    country,
    isActive,
    isVendor,
    isVerified,
    companyUrl,
    planId,
    userEmail,
    stripeCustomerInfo,
  } = data;

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;
  const customers = sequelize.models.customers;
  const stripe_customers = sequelize.models.stripe_customers;

  try {
    const subscription = await stripeService.getSubscription(
      stripeCustomerInfo.subscriptionId
    );
    const companyId = uuidv4();
    const stripeCustomerId = uuidv4();

    await sequelize.transaction(async (transaction) => {
      await companies.create(
        {
          id: companyId,
          name,
          contactEmail,
          logo,
          phone,
          fax,
          country,
          isActive: true,
          isVendor,
          isVerified: false,
          companyUrl,
        },
        { transaction }
      );

      // the stripeCustomerId here is the uuid of stripe_customers instance in zax
      await Promise.all([
        customers.create(
          {
            id: uuidv4(),
            companyId,
          },
          { transaction }
        ),
        stripe_customers.create(
          {
            id: stripeCustomerId,
            customerId: stripeCustomerInfo.customerId,
            subscriptionId: stripeCustomerInfo.subscriptionId,
            companyId,
          },
          { transaction }
        ),
      ]);

      await company_plans.create(
        {
          id: uuidv4(),
          companyId,
          planId,
          stripeCustomerId,
        },
        { transaction }
      );
      const tokenId = uuidv4();
      const expiringToken = TokenUtils.generateJwtToken(
        {
          id: tokenId,
          companyId,
        },
        process.env.USER_SIGNUP_TOKEN_SECRET!,
        {
          expiresIn: "24h",
        }
      );
      await sequelize.models.expiring_jwt_tokens.create(
        {
          id: tokenId,
          token: expiringToken,
        },
        {
          transaction,
        }
      );
      const options = {
        from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
        to: userEmail,
        subject: "Zax Exchange Account Signup",
        html: `
            <p>Please follow the link below to complete sign up for your account. The link will expire in 24 hours.</p>
            <a href="${process.env.FRONTEND_URL}/user-signup/${expiringToken}">Click here</a>
          `,
      };

      await emailService.sendMail(options);
    });

    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createCustomer,
  },
};
