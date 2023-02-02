import emailService from "../../../../gcp/EmailService";
import { stripe_customers } from "../../../../models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import stripeService from "../../../../stripe/StripeService";
import { UpdateCompanyPlanSubscriptionInfoInput } from "../../../resolvers-types.generated";

/** Updates company_plans subscription start/end date. Should happen after company instance is created in zax db */
const updateCompanyPlanSubscriptionInfo = async (
  parent: any,
  { data }: { data: UpdateCompanyPlanSubscriptionInfoInput },
  context: any
) => {
  const { subscriptionId } = data;
  try {
    const subscription = await stripeService.getSubscription(subscriptionId);

    const stripeCustomer = (await sequelize.models.stripe_customers.findOne({
      where: {
        subscriptionId,
      },
    })) as stripe_customers;

    // TODO: finish implementation
    // the stripeCustomerId here is the uuid of stripe_customers instance in zax
    const companyPlan = await sequelize.models.company_plans.findOne({
      where: {
        stripeCustomerId: stripeCustomer.id,
      },
    });

    // const encryptedCompanyId = CompanyApiUtils.encryptCompanyId(companyPlan?.get("companyId") as string);

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: stripeCustomer?.get("email") as string,
      subject: "Zax Exchange Account Signup",
      html: `
          <p>Please follow the link below to complete sign up for your account.</p>
          <a href="${process.env.FRONTEND_URL}/user-signup/${companyPlan?.get(
            "companyId"
          )}">Click here</a>
        `,
    };

    await emailService.sendMail(options);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  Mutation: { updateCompanyPlanSubscriptionInfo },
};
