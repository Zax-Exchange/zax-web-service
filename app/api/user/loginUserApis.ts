import { UserLoginInput } from "../types/common/userTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sequelize from "../../postgres/dbconnection";
import { LoggedInUser } from "../types/common/userTypes";

const login = async (data: UserLoginInput): Promise<LoggedInUser> => {
  try {
    const user = await sequelize.models.users.findOne({
      where: {
        email: data.email.toLowerCase()
      }
    }).then(u => u?.get({ plain: true }));

    if (user && await bcrypt.compare(data.password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.USER_TOKEN_SECRET!,
        {
          expiresIn: "8h"
        }
      )
      return {
        ...user,
        token
      }
    } else {
      throw new Error();
    }
  } catch(e) {
    return Promise.reject(new Error("Incorrect email/password"));
  }
}

export default login;

