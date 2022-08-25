import * as updatePlanTypes from "../../../api/types/update/planTypes";
import {
  updateCustomer as updateCustomerApi,
  updateVendor as updateVendorApi,
  updateCompanyPlan as updateCompanyPlanApi,
  updateCompanyStatus as updateCompanyStatusApi,
} from "../../../api/company/updateCompanyApis";
import {
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
  args: Record<string, updatePlanTypes.UpdateCompanyPlanInput>,
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
