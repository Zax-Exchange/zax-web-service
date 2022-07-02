
import * as enums from "../../types/common/enums";
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

  static async getUserTypeWithCompanyId(id: number): Promise<boolean | Error> {
    const companies = sequelize.models.companies;
    try {
      const company = await companies.findOne({
        attributes: ["isVendor"],
        where: {
          id
        }
      });
      return Promise.resolve(company?.getDataValue("isVendor"));
    } catch(e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  static async isVendorWithUserId (id: number): Promise<boolean | Error> {
    const users = sequelize.models.users;
    try {
      const user = await users.findOne({
        attributes: ["isVendor"],
        where: {id}
      });
      
      return Promise.resolve(user?.getDataValue("isVendor"));
    } catch(e) {
      return Promise.resolve(false);
    }
  }

  static async isUserAdmin(id: number): Promise<boolean | Error> {
    const users = sequelize.models.users;
    try {
      const user = await users.findOne({
        where: { id }
      });
      const isAdmin: boolean = user?.getDataValue("isAdmin");
      return Promise.resolve(isAdmin);
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

export default UserApiUtils;