import * as getCompanyTypes from "../../../api/types/get/companyTypes";
import { 
  getVendorDetail as getVendorDetailApi,
  getCustomerDetail as getCustomerDetailApi,
  getCompanyDetail as getCompanyDetailApi,
  getCompanyPlanDetail as getCompanyPlanDetailApi
 } from "../../../api/company/getCompanyApis";

const getCompanyDetail = (parent: any, args: Record<string, string>, context: any) => {
  return getCompanyDetailApi(args.companyId);
}

const getVendorDetail = (parent: any, args: Record<string, string>, context: any) => {
  return getVendorDetailApi(args.companyId);
}

const getCustomerDetail = (parent: any, args: Record<string, string>, context: any) => {
  return getCustomerDetailApi(args.companyId);
}

const getCompanyPlanDetail = (parent: any, { companyId } : { companyId: string }, context: any) => {
  return getCompanyPlanDetailApi(companyId);
}

export {
  getCompanyDetail,
  getVendorDetail,
  getCustomerDetail,
  getCompanyPlanDetail
}