import { CreateCustomerInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../../../../postgres/dbconnection";
import stripeService from "../../../../stripe/StripeService";

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

    await sequelize.transaction(async (transaction) => {
      const companyId = uuidv4();
      const stripeCustomerId = uuidv4();
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
            email: userEmail,
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
