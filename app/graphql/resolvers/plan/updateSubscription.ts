import { 
  updateSubscription as updateSubscriptionApi,
  updateCompanyPlanSubscriptionInfo as updateCompanyPlanSubscriptionInfoApi
} from "../../../api/plan/updateSubscriptionApis";


const updateSubscription = (parent: any, { subscriptionId }: { subscriptionId: string}, context: any) => {
  return updateSubscriptionApi(subscriptionId);
}

const updateCompanyPlanSubscriptionInfo = (parent: any, { subscriptionId }: { subscriptionId: string}, context: any) => {
  return updateCompanyPlanSubscriptionInfoApi(subscriptionId);
}
export {
  updateSubscription,
  updateCompanyPlanSubscriptionInfo
}