import { 
  getPlanWithPlanId as getPlanWithPlanIdApi,
  getAllPlans as getAllPlansApi
} from "../../../api/plan/getPlanApis";


const getPlanWithPlanId = (parent: any, args: Record<string, number>, context: any) => {
  return getPlanWithPlanIdApi(args.id);
}

const getAllPlans = (parent: any, args: any, context: any) => {
  return getAllPlansApi();
}

export {
  getPlanWithPlanId,
  getAllPlans
}