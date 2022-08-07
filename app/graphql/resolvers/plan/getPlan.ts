import { 
  getPlanWithPlanId as getPlanWithPlanIdApi,
  getAllPlans as getAllPlansApi,
  getCompanyPlanWithCompanyId as getCompanyPlanWithCompanyIdApi
} from "../../../api/plan/getPlanApis";


const getPlanWithPlanId = (parent: any, args: Record<string, string>, context: any) => {
  return getPlanWithPlanIdApi(args.id);
}

const getAllPlans = (parent: any, { isVendor }: { isVendor: boolean }, context: any) => {
  return getAllPlansApi(isVendor);
}

const getCompanyPlanWithCompanyId = (parent: any, { companyId }: { companyId: string }, context: any) => {
  return getCompanyPlanWithCompanyIdApi(companyId);
}
export {
  getPlanWithPlanId,
  getCompanyPlanWithCompanyId,
  getAllPlans
}