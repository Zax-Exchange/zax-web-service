import { 
  createStripeCustomer as createStripeCustomerApi,
  createSubscription as createSubscriptionApi
} from "../../../api/plan/createSubscriptionsApis"

const createStripeCustomer = (parent: any, { email }: { email: string}, context:any) => {
  return createStripeCustomerApi(email);
}


const createSubscription = (parent: any, { priceId, customerId }: { priceId: string, customerId: string }, context:any) => {
  return createSubscriptionApi(priceId, customerId);
}

export {
  createStripeCustomer,
  createSubscription
}