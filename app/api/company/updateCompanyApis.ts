import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import {
  UpdateCompanyPlanInput,
  UpdateCustomerInput,
  UpdateVendorInput,
} from "../../graphql/resolvers-types";

const updateVendor = async (data: UpdateVendorInput) => {
  const companies = sequelize.models.companies;
  const vendors = sequelize.models.vendors;

  try {
    const id = data.id;
    const { name, contactEmail, logo, phone, fax, companyUrl, country } =
      data.data;
    const { leadTime, moq, locations, materials } = data.data;

    await sequelize.transaction(async (transaction) => {
      await companies.update(
        {
          name,
          contactEmail,
          logo,
          phone,
          fax,
          companyUrl,
          country,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );

      await vendors.update(
        {
          leadTime,
          moq,
          locations,
          materials,
        },
        {
          where: {
            companyId: id,
          },
          transaction,
        }
      );
    });

    if (leadTime && moq && locations && materials) {
      ElasticCompanyService.updateVendorDocument({
        id,
        leadTime,
        moq,
        locations,
        materials,
      });
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateCustomer = async (data: UpdateCustomerInput) => {
  const companies = sequelize.models.companies;
  const id = data.id;
  const { name, contactEmail, logo, phone, fax, companyUrl, country } =
    data.data;

  try {
    await companies.update(
      {
        name,
        contactEmail,
        logo,
        phone,
        fax,
        companyUrl,
        country,
      },
      {
        where: {
          id,
        },
      }
    );
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateCompanyPlan = async (data: UpdateCompanyPlanInput) => {
  const { planId, companyId } = data;
  const company_plans = sequelize.models.company_plans;
  const plans = sequelize.models.plans;
  try {
    const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Updates company's isActive status
 * @param companyId
 * @param isActive
 * @returns boolean
 */
const updateCompanyStatus = async (companyId: string, isActive: boolean) => {
  try {
    const company = await sequelize.models.companies.findByPk(companyId);
    await company?.update({
      isActive,
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { updateCustomer, updateVendor, updateCompanyPlan, updateCompanyStatus };
