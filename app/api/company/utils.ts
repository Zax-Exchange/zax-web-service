
import * as commonCompanyTypes from "../../types/common/companyTypes";
import * as createCompanyTypes from "../../types/create/companyTypes";
import * as commonPlanTypes from "../../types/common/planTypes";
import * as enums from "../../types/common/enums"
import { Model, ModelStatic, Transaction } from "sequelize";
import sequelize from "../utils/dbconnection";

class CompanyApiUtils {
  static async getCompanyPlan(companyId: number): Promise<commonPlanTypes.CompanyPlan> {
    const company_plans = sequelize.models.company_plans;
    const plan = await company_plans.findOne({
      where: {
        companyId
      }
    }).then(p => p?.get({ plain:true }));
    
    return Promise.resolve(plan);
  }

  // should charge card with $1.00 first to see if card is valid
  static async checkCreditCardValidity(cardNumber: string, cardExp: string, cardCvv: string) {
    return true;
  }

  static async getCompany(id: number): Promise<commonCompanyTypes.Company> {
    const companies = sequelize.models.companies;
    try {
      const company = await companies.findByPk(id).then(comp => comp?.get({ plain:true }));
      return Promise.resolve(company);
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

export default CompanyApiUtils;