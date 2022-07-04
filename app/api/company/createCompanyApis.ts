import sequelize from "../utils/dbconnection";
import * as createCompanyTypes from "../../types/create/companyTypes";
import * as commonPlanTyes from "../../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";

const createCompany = async (data: createCompanyTypes.CreateCompanyInput): Promise<boolean> => {
  const { name, logo, phone, fax, creditCardNumber, creditCardExp, creditCardCvv, country, isActive, isVendor, isVerified, leadTime, companyUrl, planId } = data;

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;

  try {
    await sequelize.transaction(async (transaction) => {
      const companyId = await companies.create({
        name,
        logo,
        phone,
        fax,
        creditCardNumber,
        creditCardCvv,
        creditCardExp,
        country,
        isActive,
        isVendor,
        isVerified,
        leadTime,
        companyUrl
      }, {transaction}).then(c => c.getDataValue("id"));
      const plan = await getPlanWithPlanId(planId);
      
      await company_plans.create({
        companyId,
        planId,
        remainingQuota: plan.licensedUsers
      }, {transaction});

    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}



export { 
  createCompany
};