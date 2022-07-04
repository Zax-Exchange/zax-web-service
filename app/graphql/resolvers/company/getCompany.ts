import * as getCompanyTypes from "../../../types/get/companyTypes";
import { 
  getPermissionedCompany as getPermissionedCompanyApi,
  getGeneralCompany as getGeneralCompanyApi
 } from "../../../api/company/getCompanyApis";

const getPermissionedCompany = (parent: any, args: Record<string, getCompanyTypes.GetPermissionedCompanyInput>, context: any) => {
  return getPermissionedCompanyApi(args.data);
};

const getGeneralCompany = (parent: any, args: Record<string, number>, context: any) => {
  return getGeneralCompanyApi(args.companyId);
}

export {
  getGeneralCompany,
  getPermissionedCompany
}