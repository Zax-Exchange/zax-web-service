import { CreateCustomerInput } from "../../graphql/resolvers-types.generated";
import sequelize from "../../postgres/dbconnection";
import { v4 as uuidv4 } from "uuid";

const createCustomer = async (data: CreateCustomerInput): Promise<string> => {
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
  } = data;

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;
  const customers = sequelize.models.customers;
  const stripe_customers = sequelize.models.stripe_customers;

  try {
    return await sequelize.transaction(async (transaction) => {
      const stripeCustomerId = await stripe_customers
        .findOne({
          where: {
            email: userEmail,
          },
        })
        .then((customer) => customer?.get("id"));

      const companyId = await companies
        .create(
          {
            id: uuidv4(),
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
          },
          { transaction }
        )
        .then((c) => c.getDataValue("id"));

      await customers.create(
        {
          id: uuidv4(),
          companyId,
        },
        { transaction }
      );

      await company_plans.create(
        {
          id: uuidv4(),
          companyId,
          planId,
          stripeCustomerId,
        },
        { transaction }
      );

      return companyId;
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export { createCustomer };
