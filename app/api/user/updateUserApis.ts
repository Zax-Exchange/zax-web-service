import * as userTypes from "../../types/update/userTypes";
import sequelize from "../utils/dbconnection";
import UserApiUtils from "./utils";


const updateUser = async(data: userTypes.UpdateUserInput) => {
  const users = sequelize.models.users;
  const id = data.id; 

  try {
    await users.update(data, {
      where: { id }
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.resolve(false);
  }
};

const updateUserPower = async(data: userTypes.UpdateUserPowerInput) => {
  const isAdmin = UserApiUtils.isUserAdmin(data.fromId);
  return await updateUser({
    id: data.targetId,
    isAdmin: data.isAdmin
  } as userTypes.UpdateUserInput);
};

export {
  updateUser,
  updateUserPower
}