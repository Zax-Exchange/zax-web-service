import * as userTypes from "../types/create/userTypes";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";
import CompanyApiUtils from "../utils/companyUtils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Transaction } from "sequelize/types";
import { LoggedInUser } from "../types/common/userTypes";
import { v4 as uuidv4 } from "uuid";
import notificationService from "../notification/NotificationService";

const createUser = async(data: userTypes.CreateUserInput): Promise<LoggedInUser> => {
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

      const notificationToken = notificationService.createToken(user.id);

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
        process.env.USER_PASSWORD_TOKEN_SECRET!,
        {
          expiresIn: "8h"
        }
      )

      return {
        ...user,
        notificationToken,
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