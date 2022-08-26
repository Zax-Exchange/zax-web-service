import sequelize from "../../../../postgres/dbconnection";
import { CreateVendorInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import ElasticCompanyService from "../../../../elastic/company/ElasticCompanyService";

const createVendor = async (
  parents: any,
  { data }: { data: CreateVendorInput },
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
    leadTime,
    companyUrl,
    planId,
    locations,
    moq,
    materials,
    userEmail,
  } = data;

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;
  const vendors = sequelize.models.vendors;
  const stripe_customers = sequelize.models.stripe_customers;

  try {
    return await sequelize.transaction(async (transaction) => {
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

      const stripeCustomerId = await stripe_customers
        .findOne({
          where: {
            email: userEmail,
          },
        })
        .then((customer) => customer?.get("id"));

      await vendors.create(
        {
          id: uuidv4(),
          companyId,
          leadTime,
          locations,
          moq,
          materials,
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

      ElasticCompanyService.createVendorDocument({
        id: companyId,
        leadTime: leadTime,
        locations: locations,
        moq: moq,
        materials: materials,
      });

      return companyId;
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createVendor,
  },
};
