
import * as commonCompanyTypes from "../types/common/companyTypes";
import * as createCompanyTypes from "../types/create/companyTypes";
import * as commonPlanTypes from "../types/common/planTypes";
import * as enums from "../types/common/enums"
import { Model, ModelStatic, Transaction } from "sequelize";
import sequelize from "../../postgres/dbconnection";
import { companiesAttributes } from "../models/companies";
import jwt from "jsonwebtoken";

class CompanyApiUtils {
  static async getCompanyPlan(companyId: number): Promise<commonPlanTypes.CompanyPlan> {
    const company_plans = sequelize.models.company_plans;
    try {
      return await company_plans.findOne({
        where: {
          companyId
        }
      }).then(p => p?.get({ plain:true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // TODO: should charge card with $1.00 first to see if card is valid
  static async checkCreditCardValidity(cardNumber: string, cardExp: string, cardCvv: string) {
    return true;
  }

  static async getCompanyWithCompanyId(id: number): Promise<companiesAttributes> {
    const companies = sequelize.models.companies;
    try {
      return await companies.findByPk(id).then(comp => comp?.get({ plain:true }));
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async getCompanyByIds(ids: number[]): Promise<companiesAttributes[]>{
    const companies = sequelize.models.companies;
    try {
      const res = [];
      for (let id of ids) {
        const comp = await CompanyApiUtils.getCompanyWithCompanyId(id);
        if (comp) res.push(comp);
      }
      return res;
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async isDuplicateCompanyNames(name: string) {
    const companies = sequelize.models.companies;
    try {
      const foundCompany = await companies.findOne({ where: {name}}).then(c => c?.get());
      if (foundCompany) {
        return true;
      }
      return false;
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async isVendorWithCompanyId(id: number): Promise<boolean> {
    const companies = sequelize.models.companies;
    try {
      return await companies.findOne({
        attributes: ["isVendor"],
        where: {
          id
        }
      }).then(c => c?.getDataValue("isVendor"));
    } catch(e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  static async getVendorWithCompanyId(companyId: number) {
    const vendors = sequelize.models.vendors;
    try {
      return await vendors.findOne({
        where: {
          companyId
        }
      }).then(v => v?.get({ plain:true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getCustomerWithCompanyId(companyId: number) {
    const customers = sequelize.models.customers;
    try {
      return await customers.findOne({
        where: {
          companyId
        }
      }).then(v => v?.get({ plain:true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static encryptCompanyId(id: number) {
    return jwt.sign(
        {
          id
        },
        process.env.COMPANY_ID_SECRET!,
        {
          expiresIn: "24h"
        }
      );
  }
}

export default CompanyApiUtils;