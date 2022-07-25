import * as userTypes from "../types/create/userTypes";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";
import CompanyApiUtils from "../utils/companyUtils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { decreaseCompanyQuota } from "../company/updateCompanyApis";
import { Transaction } from "sequelize/types";
import { LoggedInUser } from "../types/common/userTypes";

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
    const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);

    if (companyPlan.remainingQuota <= 0) {
      throw new Error("No more licensed users allowed.");
    }

    return await sequelize.transaction(async (transaction: Transaction) => {
      const encrypted = await bcrypt.hash(password, 10);

      const user = await users.create({
        name,
        email: email.toLowerCase(),
        companyId,
        password: encrypted,
        isAdmin: isFirst,
        isVendor,
        isActive: true
      }, {transaction}).then(u => u.get({ plain:true }));

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.USER_PASSWORD_TOKEN_SECRET!,
        {
          expiresIn: "8h"
        }
      )
      await decreaseCompanyQuota(companyId, companyPlan.remainingQuota - 1, transaction);

      return {
        ...user,
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