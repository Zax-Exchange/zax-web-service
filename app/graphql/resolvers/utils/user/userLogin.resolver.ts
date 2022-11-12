import { usersAttributes } from "../../../../models/users";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  LoggedInUser,
  UserLoginInput,
  UserStatus,
} from "../../../resolvers-types.generated";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (
  parent: any,
  { data }: { data: UserLoginInput },
  context: any
) => {
  try {
    const user = await sequelize.models.users
      .findOne({
        where: {
          email: data.email.toLowerCase(),
        },
      })
      .then((u) => u?.get({ plain: true }) as usersAttributes);
    if (user.status !== UserStatus.Active) {
      throw new Error("Account is not active.");
    }

    const notificationToken = streamService.createToken(user.id);
    const chatToken = streamService.createToken(user.companyId);

    if (!notificationToken || !chatToken) {
      throw new Error("Unable to generate stream token");
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (user && valid) {
      const loggedInUser = {
        id: user.id,
        companyId: user.companyId,
        name: user.name,
        email: user.email,
        power: user.power,
        isVendor: user.isVendor,
        notificationToken,
        chatToken,
      };
      const token = jwt.sign(
        loggedInUser,
        process.env.USER_SESSION_TOKEN_SECRET!,
        {
          expiresIn: "8h",
        }
      );

      return {
        ...loggedInUser,
        token,
      } as LoggedInUser;
    } else {
      throw new Error("Incorrect email/password.");
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    login,
  },
};
