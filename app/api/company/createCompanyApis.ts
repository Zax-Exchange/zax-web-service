import sequelize from "../../postgres/dbconnection";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import { v4 as uuidv4 } from "uuid";
import {
  CreateCustomerInput,
  CreateVendorInput,
} from "../../graphql/resolvers-types";

const createVendor = async (data: CreateVendorInput): Promise<string> => {
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

      const plan = await getPlanWithPlanId(planId, transaction);

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

// const createCompanyLogo = async ()
const checkCompanyName = async (name: string) => {
  return await CompanyApiUtils.isDuplicateCompanyNames(name);
};

export { createVendor, createCustomer, checkCompanyName };
