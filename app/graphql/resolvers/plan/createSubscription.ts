import { 
  createStripeCustomer as createStripeCustomerApi,
  createCustomerSubscription as createCustomerSubscriptionApi,
  createVendorSubscription as createVendorSubscriptionApi,
  checkUserEmail as checkUserEmailApi
} from "../../../api/plan/createSubscriptionsApis"
import { CreateVendorSubscriptionInput } from "../../../api/types/create/planTypes";

const createStripeCustomer = (parent: any, { email }: { email: string}, context:any) => {
  return createStripeCustomerApi(email);
}


const createCustomerSubscription = (parent: any, { priceId, stripeCustomerId }: { priceId: string, stripeCustomerId: string }, context:any) => {
  return createCustomerSubscriptionApi(priceId, stripeCustomerId);
}

const createVendorSubscription = (parent: any, args: Record<string, CreateVendorSubscriptionInput>, context:any) => {
  return createVendorSubscriptionApi(args.data);
}

const checkUserEmail = (parent: any, { email }: { email: string }, context:any) => {
  return checkUserEmailApi(email);
}

export {
  createStripeCustomer,
  createCustomerSubscription,
  createVendorSubscription,
  checkUserEmail
}