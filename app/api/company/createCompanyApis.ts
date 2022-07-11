import sequelize from "../../postgres/dbconnection";
import * as createCompanyTypes from "../types/create/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";


const createCompany = async (data: createCompanyTypes.CreateCompanyInput): Promise<boolean> => {
  const { name, logo, phone, fax, creditCardNumber, creditCardCvv, creditCardExp, country, isActive, isVendor, isVerified, leadTime, companyUrl, planId, locations, moq, materials} = data;

  const companies = sequelize.models.companies;
  const company_plans = sequelize.models.company_plans;

  try {
    await sequelize.transaction(async (transaction) => {

      await CompanyApiUtils.checkCreditCardValidity(creditCardNumber, creditCardCvv, creditCardExp);
      const isDuplicate = await CompanyApiUtils.isDuplicateCompanyNames(name);
      if (isDuplicate) {
        throw new Error("Duplicate company names");
      }
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
        companyUrl,
        locations, 
        moq,
        materials
      }, {transaction}).then(c => c.getDataValue("id"));
      const plan = await getPlanWithPlanId(planId, transaction);
      
      await company_plans.create({
        companyId,
        planId,
        remainingQuota: plan.licensedUsers
      }, {transaction});

      if (isVendor) {
        await ElasticCompanyService.createVendorDocument({ 
          id: companyId, 
          leadTime: leadTime || "NULL", 
          locations: locations || "NULL",
          moq: moq || "NULL",
          materials: materials || "NULL"
        });
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    return Promise.reject(e);
  }
}



export { 
  createCompany
};