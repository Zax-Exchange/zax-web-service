import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import {
  UpdateCompanyPlanInput,
  UpdateCustomerInput,
  UpdateVendorInput,
} from "../../graphql/resolvers-types.generated";

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

export { updateCompanyPlan, updateCompanyStatus };
