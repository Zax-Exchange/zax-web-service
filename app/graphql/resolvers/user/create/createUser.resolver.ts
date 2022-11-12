import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";
import {
  CreateUserInput,
  LoggedInUser,
  UserPower,
  UserStatus,
} from "../../../resolvers-types.generated";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import streamService from "../../../../stream/StreamService";
import jwt from "jsonwebtoken";

const createUser = async (
  parent: any,
  { data }: { data: CreateUserInput },
  context: any
) => {
  const users = sequelize.models.users;

  const { name, email, companyId, password } = data;
  try {
    const foundUser = await users.findOne({
      where: {
        email,
      },
    });
    if (foundUser) {
      throw new Error("Duplicate email!");
    }

    const isFirst = await UserApiUtils.isUserFirstInCompany(companyId);
    const isVendor = await CompanyApiUtils.isVendorWithCompanyId(companyId);

    return await sequelize.transaction(async (transaction: Transaction) => {
      const encrypted = await bcrypt.hash(password, 10);

      const user = await users
        .create(
          {
            id: uuidv4(),
            companyId,
            name,
            email: email.toLowerCase(),
            password: encrypted,
            status: UserStatus.Active,
            power: isFirst ? UserPower.Admin : UserPower.User,
            isVendor,
          },
          { transaction }
        )
        .then((u) => u.get({ plain: true }));

      const notificationToken = streamService.createToken(user.id);
      const chatToken = streamService.createToken(companyId);

      const loggedInUser = {
        id: user.id,
        companyId: user.companyId,
        name: user.name,
        email: user.email,
        isVendor: user.isVendor,
        power: user.power,
        notificationToken,
        chatToken,
      };
      const token = jwt.sign(
        loggedInUser,
        process.env.USER_PASSWORD_TOKEN_SECRET!,
        {
          expiresIn: "8h",
        }
      );

      return {
        ...loggedInUser,
        token,
      } as LoggedInUser;
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createUser,
  },
};
