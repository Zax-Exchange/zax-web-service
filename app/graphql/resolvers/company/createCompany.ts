import * as createCompanyTypes from "../../../api/types/create/companyTypes";
import { 
  createVendor as createVendorApi,
  createCustomer as createCustomerApi,
  checkCompanyName as checkCompanyNameApi
} from "../../../api/company/createCompanyApis";

const createVendor = (parents: any, args: Record<string, createCompanyTypes.CreateVendorInput>, context: any) => {
  return createVendorApi(args.data);
}

const createCustomer = (parents: any, args: Record<string, createCompanyTypes.CreateCustomerInput>, context: any) => {  
  return createCustomerApi(args.data);
}

const checkCompanyName = (parents: any, { name }: { name: string }, context: any) => {  
  return checkCompanyNameApi(name);
}

export {
  createVendor,
  createCustomer,
  checkCompanyName
}