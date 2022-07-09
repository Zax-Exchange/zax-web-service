import * as userTypes from "../../types/common/userTypes";
import { companies } from "../models/companies";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";


// returns a list of users with user power
const getAllUsersWithinCompany = async(companyId: number): Promise<userTypes.User[]> => {
  const companies = sequelize.models.companies;
  try {
    const userList: any = await companies.findByPk(companyId).then(async comp => {
      return await (comp as companies).getUsers().then(list => list.map(u => u.get({plain:true})))
    })
  
    return userList;
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

const getUserWithUserId = async(id: number): Promise<userTypes.User> => {
  const users = sequelize.models.users;
  try {
    const user = await users.findByPk(id).then(u => u?.get({ plain:true }));
    return user
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
}

// get user with companyid
export {
  getAllUsersWithinCompany,
  getUserWithUserId
}