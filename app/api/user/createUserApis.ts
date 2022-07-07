import * as userTypes from "../../types/create/userTypes";
import sequelize from "../utils/dbconnection";
import UserApiUtils from "./utils";
import CompanyApiUtils from "../company/utils";
import { decreaseCompanyQuota } from "../company/updateCompanyApis";
import { Transaction } from "sequelize/types";

const createUser = async(data: userTypes.CreateUserInput) => {
  const users = sequelize.models.users;

  const {name, email, companyId, password} = data;
  try {
    const isFirst = await UserApiUtils.isUserFirstInCompany(companyId);
    const isVendor = await CompanyApiUtils.isVendorWithCompanyId(companyId);
    const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);

    if (companyPlan.remainingQuota <= 0) {
      throw new Error("No more licensed users allowed.");
    }

    await sequelize.transaction(async (transaction: Transaction) => {
      await users.create({
        name,
        email,
        companyId,
        password,
        isAdmin: isFirst,
        isVendor,
        isActive: true
      }, {transaction});
      await decreaseCompanyQuota(companyId, companyPlan.remainingQuota - 1, transaction);
    })
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};


export {
  createUser
}