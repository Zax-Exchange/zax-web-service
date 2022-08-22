import * as userTypes from "../types/create/userTypes";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";
import CompanyApiUtils from "../utils/companyUtils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Transaction } from "sequelize/types";
import { LoggedInUser } from "../types/common/userTypes";
import { v4 as uuidv4 } from "uuid";
import streamService from "../../stream/StreamService";
import { CreateUserInput } from "../../graphql/resolvers-types";

const createUser = async(data: CreateUserInput): Promise<LoggedInUser> => {
  const users = sequelize.models.users;

  const {name, email, companyId, password} = data;
  try {
    const foundUser = await users.findOne({
      where: {
        email
      }
    })
    if (foundUser) {
      throw new Error("Duplicate email!");
    }

    const isFirst = await UserApiUtils.isUserFirstInCompany(companyId);
    const isVendor = await CompanyApiUtils.isVendorWithCompanyId(companyId);

    return await sequelize.transaction(async (transaction: Transaction) => {
      const encrypted = await bcrypt.hash(password, 10);

      const user = await users.create({
        id: uuidv4(),
        name,
        email: email.toLowerCase(),
        companyId,
        password: encrypted,
        isAdmin: isFirst,
        isVendor,
        isActive: true
      }, {transaction}).then(u => u.get({ plain:true }));

      const notificationToken = streamService.createToken(user.id);
      const chatToken = streamService.createToken(companyId);

      const token = jwt.sign(
        {
          id: user.id,
          companyId: user.companyId,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isVendor: user.isVendor,
          isActive: user.isActive,
          notificationToken,
          chatToken,
        },
        process.env.USER_PASSWORD_TOKEN_SECRET!,
        {
          expiresIn: "8h",
        }
      );

      return {
        ...user,
        notificationToken,
        chatToken,
        token
      }
    })
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};


export {
  createUser
}