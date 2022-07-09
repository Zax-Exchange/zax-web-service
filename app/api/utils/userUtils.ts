
import * as enums from "../../types/common/enums";
import sequelize from "../../postgres/dbconnection";

class UserApiUtils {
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
      return await users.findOne({
        where: { id }
      }).then(u => u?.get("isAdmin") as boolean);
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

export default UserApiUtils;