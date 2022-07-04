import * as userTypes from "../../types/common/userTypes";
import sequelize from "../utils/dbconnection";
import UserApiUtils from "./utils";


const getAllUsers = async(): Promise<userTypes.User[]> => {
  const users = sequelize.models.users;
  try {
    const userList = await users.findAll().then(users => {
      return users.map(u => u.get({ plain:true }));
    })
    
    return Promise.resolve(userList);
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

const getUserWithUserId = async(id: number): Promise<userTypes.User> => {
  const users = sequelize.models.users;
  try {
    const user = await users.findOne({
      where: {id}
    });
    return user?.get({ plain:true });
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
}

export {
  getAllUsers,
  getUserWithUserId
}