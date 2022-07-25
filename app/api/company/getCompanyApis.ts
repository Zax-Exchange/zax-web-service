import sequelize from "../../postgres/dbconnection";
import * as getCompanyTypes from "../types/get/companyTypes";
import * as commonCompanyTypes from "../types/common/companyTypes";
import * as commonPlanTyes from "../types/common/planTypes";
import { getPlanWithPlanId } from "../plan/getPlanApis";
import CompanyApiUtils from "../utils/companyUtils";
import UserApiUtils from "../utils/userUtils";

// should only be called with user within the company
// const getPermissionedCompany = async (data: getCompanyTypes.GetPermissionedCompanyInput): Promise<commonCompanyTypes.PermissionedCompany> => {
//   const { companyId, userId } = data;

//   try {
//     const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
//     const companyPlan = await CompanyApiUtils.getCompanyPlan(companyId);
//     const isAdmin = await UserApiUtils.isUserAdmin(userId);

//     const res = {
//       ...company,
//       planInfo: companyPlan,
//       isAdmin
//     };
//     return res;
//   } catch(e) {
//     return Promise.reject(e);
//   }
// };

// company public view
const getVendorDetail = async (companyId: number): Promise<commonCompanyTypes.VendorDetail> => {
try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);
    const vendor = await CompanyApiUtils.getVendorWithCompanyId(companyId);
    const { moq, locations, materials, leadTime } = vendor;
    const { id, name, logo, phone, fax, country, isActive, isVendor, isVerified, companyUrl, createdAt, updatedAt } = company;
    const res = {
      id, 
      name, 
      logo,
      country,
      phone, 
      fax, 
      isVendor, 
      isVerified, 
      isActive,
      leadTime, 
      moq, 
      locations, 
      materials,
      companyUrl,
    };
    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};

const getCustomerDetail = async (companyId: number): Promise<commonCompanyTypes.CustomerDetail> => {
try {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);


    const { id, name, logo, phone, fax, country, isActive, isVerified, companyUrl } = company;
    const res = {
      id, 
      name, 
      logo,
      country,
      phone, 
      fax, 
      isVerified, 
      isActive,
      companyUrl,
    };
    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};


export {
  getCustomerDetail,
  getVendorDetail
}