import sequelize from "../../postgres/dbconnection";
import { companiesAttributes } from "../models/companies";
import jwt from "jsonwebtoken";
import { CompanyPlan } from "../../graphql/resolvers-types.generated";
import { vendorsAttributes } from "../models/vendors";
import { customersAttributes } from "../models/customers";

class CompanyApiUtils {
  static async getCompanyPlan(companyId: string): Promise<CompanyPlan> {
    const company_plans = sequelize.models.company_plans;
    try {
      return await company_plans
        .findOne({
          where: {
            companyId,
          },
        })
        .then((p) => p?.get({ plain: true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getCompanyWithCompanyId(
    id: string
  ): Promise<companiesAttributes> {
    const companies = sequelize.models.companies;
    try {
      return await companies
        .findByPk(id)
        .then((comp) => comp?.get({ plain: true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getCompanyByIds(ids: string[]): Promise<companiesAttributes[]> {
    const companies = sequelize.models.companies;
    try {
      const res = [];
      for (let id of ids) {
        const comp = await CompanyApiUtils.getCompanyWithCompanyId(id);
        if (comp) res.push(comp);
      }
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async isDuplicateCompanyNames(name: string) {
    const companies = sequelize.models.companies;
    try {
      const foundCompany = await companies
        .findOne({ where: { name } })
        .then((c) => c?.get());
      if (foundCompany) {
        return true;
      }
      return false;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async isVendorWithCompanyId(id: string): Promise<boolean> {
    const companies = sequelize.models.companies;
    try {
      return await companies
        .findOne({
          attributes: ["isVendor"],
          where: {
            id,
          },
        })
        .then((c) => c?.getDataValue("isVendor"));
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  static async getVendorWithCompanyId(
    companyId: string
  ): Promise<vendorsAttributes> {
    const vendors = sequelize.models.vendors;
    try {
      return await vendors
        .findOne({
          where: {
            companyId,
          },
        })
        .then((v) => v?.get({ plain: true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getCustomerWithCompanyId(
    companyId: string
  ): Promise<customersAttributes> {
    const customers = sequelize.models.customers;
    try {
      return await customers
        .findOne({
          where: {
            companyId,
          },
        })
        .then((v) => v?.get({ plain: true }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static encryptCompanyId(id: string) {
    return jwt.sign(
      {
        id,
      },
      process.env.COMPANY_ID_SECRET!,
      {
        expiresIn: "24h",
      }
    );
  }
}

export default CompanyApiUtils;
