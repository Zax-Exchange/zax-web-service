import { CreateUserInput } from "../../graphql/resolvers/user/createUser.js";
import { UpdateUserInput } from "../../graphql/resolvers/user/updateUser.js";
import sql from "../utils/dbconnection.js";

const createUser = async(data: any) => {

  const {name, email, companyId, isAdmin, password} = data.createUserInput;
  try {
    await sql`
      insert into users
        (name, email, companyId, isAdmin, password)
      values
        (${name}, ${email}, ${companyId}, ${isAdmin}, ${password})
    `;
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.reject(false);
  }
};

const updateUser = async(data: any) => {
 const {name, email, id} = data.updateUserInput;

  try {
    await sql`
      update users
        set 
          name=${name},
          email=${email}
        where
          id=${id}
    `;
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.resolve(false);
  }
};

const getAllUsers = async() => {
  try {
    return await sql`select * from users`;
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