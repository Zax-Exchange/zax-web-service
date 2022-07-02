import * as userTypes from "../../types/create/userTypes";
import sequelize from "../utils/dbconnection";
import UserApiUtils from "./utils";

const createUser = async(data: userTypes.CreateUserInput) => {
  const users = sequelize.models.users;
  const {name, email, companyId, password} = data;
  try {
    const isFirst = await UserApiUtils.isUserFirstInCompany(companyId);
    const isVendor = await UserApiUtils.getUserTypeWithCompanyId(companyId);

    await users.create({
      name,
      email,
      companyId,
      password,
      isAdmin: isFirst,
      isVendor
    })
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};


export {
  createUser
}