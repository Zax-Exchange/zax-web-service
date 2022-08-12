import { UserLoginInput } from "../types/common/userTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sequelize from "../../postgres/dbconnection";
import { LoggedInUser } from "../types/common/userTypes";
import { connect } from 'getstream';
import { usersAttributes } from "../models/users";
import notificationService from "../notification/NotificationService";

const login = async (data: UserLoginInput): Promise<LoggedInUser> => {
  try {
    const user = await sequelize.models.users.findOne({
      where: {
        email: data.email.toLowerCase()
      }
    }).then(u => u?.get({ plain: true }) as usersAttributes);
    if (!user.isActive) {
      throw new Error("Account is not active.")
    }

    const notificationToken = notificationService.createToken(user.id);

    if (!notificationToken) {
      throw new Error("Something went wrong.")
    }
    
    const valid = await bcrypt.compare(data.password, user.password);
    if (user && valid) {

      const token = jwt.sign(
        {
          id: user.id,
          companyId: user.companyId,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isVendor: user.isVendor,
          isActive: user.isActive,
          notificationToken
        },
        process.env.USER_SESSION_TOKEN_SECRET!,
        {
          expiresIn: "8h"
        }
      )
      return {
        ...user,
        notificationToken,
        token
      }
    } else {
      throw new Error("Incorrect email/password.");
    }
  } catch(e) {
    return Promise.reject(e);
  }
}

export default login;

