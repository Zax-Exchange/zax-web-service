import * as userTypes from "../types/common/userTypes";
import { companies } from "../models/companies";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";
import { User } from "../../graphql/resolvers-types.generated";

// returns a list of users with user power
const getAllUsersWithinCompany = async (companyId: string): Promise<User[]> => {
  const companies = sequelize.models.companies;
  try {
    const userList: any = await companies
      .findByPk(companyId)
      .then(async (comp) => {
        return await (comp as companies)
          .getUsers()
          .then((list) => list.map((u) => u.get({ plain: true })));
      });

    return userList;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const getUserWithUserId = async (
  id: string,
  paranoid: boolean = true
): Promise<User> => {
  const users = sequelize.models.users;
  try {
    const user = await users
      .findByPk(id, {
        paranoid,
      })
      .then((u) => u?.get({ plain: true }));
    const res = {
      id: user.id,
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      isVendor: user.isVendor,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    };
    return res;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// get user with companyid
export { getAllUsersWithinCompany, getUserWithUserId };
