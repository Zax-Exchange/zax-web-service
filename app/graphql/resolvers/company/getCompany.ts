import * as getCompanyTypes from "../../../api/types/get/companyTypes";
import { 
  getPermissionedCompany as getPermissionedCompanyApi,
  getCompanyDetail as getCompanyDetailApi
 } from "../../../api/company/getCompanyApis";

const getPermissionedCompany = (parent: any, args: Record<string, getCompanyTypes.GetPermissionedCompanyInput>, context: any) => {
  return getPermissionedCompanyApi(args.data);
};

const getCompanyDetail = (parent: any, args: Record<string, number>, context: any) => {
  return getCompanyDetailApi(args.companyId);
}

export {
  getCompanyDetail,
  getPermissionedCompany
}