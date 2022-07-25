import * as getCompanyTypes from "../../../api/types/get/companyTypes";
import { 
  getVendorDetail as getVendorDetailApi,
  getCustomerDetail as getCustomerDetailApi
 } from "../../../api/company/getCompanyApis";



const getVendorDetail = (parent: any, args: Record<string, number>, context: any) => {
  return getVendorDetailApi(args.companyId);
}

const getCustomerDetail = (parent: any, args: Record<string, number>, context: any) => {
  return getCustomerDetailApi(args.companyId);
}

export {
  getVendorDetail,
  getCustomerDetail
}