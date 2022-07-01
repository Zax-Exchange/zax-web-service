import * as userTypes from "../../types/userTypes";
import * as enums from "../../types/enums"
import { Model, ModelStatic } from "sequelize";
import sequelize from "../utils/dbconnection";

class UserApiUtils {
  static async isUserFirstInCompany(companyId: number): Promise<boolean | Error> {
    const users = sequelize.models.users;
    try {
      const foundUsers = await users.findAll({
        where: {
          companyId
        }
      });
      return Promise.resolve(foundUsers.length === 0);
    } catch(e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  static async getUserTypeWithCompanyId(id: number): Promise<enums.UserType | Error> {
    const companies = sequelize.models.companies;
    try {
      const company = await companies.findOne({
        attributes: ["isVendor"],
        where: {
          id
        }
      });
      const isVendor = company?.getDataValue("isVendor");
      if (isVendor) {
        return Promise.resolve(enums.UserType.VENDOR);
      }
      return Promise.resolve(enums.UserType.CUSTOMER);
    } catch(e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  static async isVendorWithUserId (id: number): Promise<boolean | Error> {
    const users = sequelize.models.users;
    try {
      const user = await users.findOne({
        attributes: ["userType"],
        where: {id}
      });
      
      return Promise.resolve(user?.getDataValue("userType") === enums.UserType.VENDOR);
    } catch(e) {
      return Promise.resolve(false);
    }
  }
}

export default UserApiUtils;