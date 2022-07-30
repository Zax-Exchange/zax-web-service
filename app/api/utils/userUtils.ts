
import * as enums from "../types/common/enums";
import sequelize from "../../postgres/dbconnection";
import { users } from "../models/users";

class UserApiUtils {

  static async getUserWithUserId(id: number): Promise<users> {
    const users = sequelize.models.users;
    try {
      return await users.findByPk(id).then(u => u?.get({ plain: true }));
    } catch(e) {
      return Promise.reject(e);
    }
  }
  static async isUserFirstInCompany(companyId: number): Promise<boolean> {
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

  static async isVendorWithUserId (id: number): Promise<boolean> {
    const users = sequelize.models.users;
    try {
      const user = await users.findOne({
        attributes: ["isVendor"],
        where: {id}
      });
      return Promise.resolve(user?.getDataValue("isVendor"));
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async isUserAdmin(id: number): Promise<boolean> {
    const users = sequelize.models.users;
    try {
      return await users.findByPk(id).then(u => u?.get("isAdmin") as boolean);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async getUserCompanyId(id: number): Promise<number> {
    const users = sequelize.models.users;
    try {
      return await users.findByPk(id).then(u => u?.get("companyId") as number);
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

export default UserApiUtils;