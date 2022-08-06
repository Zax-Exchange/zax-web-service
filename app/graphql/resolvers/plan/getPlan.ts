import { 
  getPlanWithPlanId as getPlanWithPlanIdApi,
  getAllPlans as getAllPlansApi
} from "../../../api/plan/getPlanApis";


const getPlanWithPlanId = (parent: any, args: Record<string, string>, context: any) => {
  return getPlanWithPlanIdApi(args.id);
}

const getAllPlans = (parent: any, { isVendor }: { isVendor: boolean }, context: any) => {
  return getAllPlansApi(isVendor);
}

export {
  getPlanWithPlanId,
  getAllPlans
}