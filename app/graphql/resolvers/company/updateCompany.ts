import {
  updateCompanyPlan as updateCompanyPlanApi,
  updateCompanyStatus as updateCompanyStatusApi,
} from "../../../api/company/updateCompanyApis";
import { updateCustomer as updateCustomerApi } from "../../../api/customer/updateCustomerApis";
import { updateVendor as updateVendorApi } from "../../../api/vendor/updateVendorApis";
import {
  UpdateCompanyPlanInput,
  UpdateCustomerInput,
  UpdateVendorInput,
} from "../../resolvers-types.generated";

const updateCustomer = (
  parents: any,
  args: Record<string, UpdateCustomerInput>,
  context: any
) => {
  return updateCustomerApi(args.data);
};

const updateVendor = (
  parents: any,
  args: Record<string, UpdateVendorInput>,
  context: any
) => {
  return updateVendorApi(args.data);
};

const updateCompanyPlan = (
  parents: any,
  args: Record<string, UpdateCompanyPlanInput>,
  context: any
) => {
  return updateCompanyPlanApi(args.data);
};

const updateCompanyStatus = (
  parents: any,
  { companyId, isActive }: { companyId: string; isActive: boolean },
  context: any
) => {
  return updateCompanyStatusApi(companyId, isActive);
};

export { updateCustomer, updateVendor, updateCompanyPlan, updateCompanyStatus };
