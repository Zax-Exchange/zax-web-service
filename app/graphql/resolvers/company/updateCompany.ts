import * as updatePlanTypes from "../../../api/types/update/planTypes";
import * as updateCompanyTypes from "../../../api/types/update/companyTypes";
import { 
  updateCustomer as updateCustomerApi,
  updateVendor as updateVendorApi,
  updateCompanyPlan as updateCompanyPlanApi
 } from "../../../api/company/updateCompanyApis";

const updateCustomer = (parents: any, args: Record<string, updateCompanyTypes.UpdateCustomerInput>, context: any) => {
  return updateCustomerApi(args.data);
};

const updateVendor = (parents: any, args: Record<string, updateCompanyTypes.UpdateVendorInput>, context: any) => {
  return updateVendorApi(args.data);
};

const updateCompanyPlan = (parents: any, args: Record<string, updatePlanTypes.UpdateCompanyPlanInput>, context: any) => {
  return updateCompanyPlanApi(args.data);
};

export {
  updateCustomer,
  updateVendor,
  updateCompanyPlan
};