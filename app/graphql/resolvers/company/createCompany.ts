import {
  createVendor as createVendorApi,
  createCustomer as createCustomerApi,
  checkCompanyName as checkCompanyNameApi,
} from "../../../api/company/createCompanyApis";
import {
  CreateCustomerInput,
  CreateVendorInput,
} from "../../resolvers-types.generated";

const createVendor = (
  parents: any,
  args: Record<string, CreateVendorInput>,
  context: any
) => {
  return createVendorApi(args.data);
};

const createCustomer = (
  parents: any,
  args: Record<string, CreateCustomerInput>,
  context: any
) => {
  return createCustomerApi(args.data);
};

const checkCompanyName = (
  parents: any,
  { name }: { name: string },
  context: any
) => {
  return checkCompanyNameApi(name);
};

export { createVendor, createCustomer, checkCompanyName };
