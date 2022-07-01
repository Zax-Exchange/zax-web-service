import * as userTypes from "../../types/userTypes";
import sequelize from "../utils/dbconnection";
import UserApiUtils from "./utils";

const createUser = async(data: userTypes.CreateUserInput) => {
  const users = sequelize.models.users;
  const {name, email, companyId, password} = data;
  try {
    const isFirst = await UserApiUtils.isUserFirstInCompany(companyId);
    const userType = await UserApiUtils.getUserType(companyId);

    await users.create({
      name,
      email,
      companyId,
      password,
      isAdmin: isFirst,
      userType
    })
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const updateUser = async(data: any) => {
  const users = sequelize.models.users;

  const userData: Record<string, any> = {};
  for (let field in data.updateUserInput) {
    if (field !== "id") {
      userData[field] = data.updateUserInput[field];
    }
  }
  try {
    await users.update(userData, {
      where: {
        id: data.updateUserInput.id
      }
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.resolve(false);
  }
};

const getAllUsers = async() => {
  const users = sequelize.models.users;
  try {
    return await users.findAll();
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

export {
  createUser,
  updateUser,
  getAllUsers
}