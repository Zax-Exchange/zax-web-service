import { createVendor as createVendorApi } from "../../../api/vendor/createVendorApis";
import { createCustomer as createCustomerApi } from "../../../api/customer/createCustomerApis";

import {
  CreateCustomerInput,
  CreateVendorInput,
} from "../../resolvers-types.generated";
import CompanyApiUtils from "../../../api/utils/companyUtils";

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
  return CompanyApiUtils.checkCompanyName(name);
};

export { createVendor, createCustomer, checkCompanyName };
