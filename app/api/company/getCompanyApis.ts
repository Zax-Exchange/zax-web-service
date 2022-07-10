import sequelize from "../../postgres/dbconnection";
import * as getCompanyTypes from "../types/get/companyTypes";
import * as commonCompanyTypes from "../types/common/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import UserApiUtils from "../utils/userUtils";

// should only be called with user within the company
const getPermissionedCompany = async (data: getCompanyTypes.GetPermissionedCompanyInput): Promise<commonCompanyTypes.PermissionedCompany> => {
  const { companyId, userId } = data;

  try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);
    const isAdmin = await UserApiUtils.isUserAdmin(userId);

    const res = {
      ...company,
      planInfo: companyPlan,
      isAdmin
    };
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e);
  }
};

// company public view
const getGeneralCompany = async (companyId: number): Promise<commonCompanyTypes.GeneralCompany> => {
try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const { id, name, logo, phone, fax, isVendor, isVerified, leadTime, companyUrl, createdAt, updatedAt } = company;
    const res = {
      id, 
      name, 
      logo,
      phone, 
      fax, 
      isVendor, 
      isVerified, 
      leadTime, 
      companyUrl,
      createdAt, 
      updatedAt
    };
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e);
  }
};


export {
  getPermissionedCompany,
  getGeneralCompany
}