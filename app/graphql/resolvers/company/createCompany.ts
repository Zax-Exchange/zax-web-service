import * as createCompanyTypes from "../../../api/types/create/companyTypes";
import { 
  createVendor as createVendorApi,
  createCustomer as createCustomerApi 
} from "../../../api/company/createCompanyApis";

const createVendor = (parents: any, args: Record<string, createCompanyTypes.CreateVendorInput>, context: any) => {
  return createVendorApi(args.data);
}

const createCustomer = (parents: any, args: Record<string, createCompanyTypes.CreateCustomerInput>, context: any) => {
  return createCustomerApi(args.data);
}

export {
  createVendor,
  createCustomer
}