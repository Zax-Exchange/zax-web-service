import {
  createStripeCustomer as createStripeCustomerApi,
  createCustomerSubscription as createCustomerSubscriptionApi,
  createVendorSubscription as createVendorSubscriptionApi,
  checkUserEmail as checkUserEmailApi,
} from "../../../api/subscription/createSubscriptionsApis";
import { CreateVendorSubscriptionInput } from "../../resolvers-types.generated";

const createStripeCustomer = (
  parent: any,
  { email }: { email: string },
  context: any
) => {
  return createStripeCustomerApi(email);
};

const createCustomerSubscription = (
  parent: any,
  { priceId, stripeCustomerId }: { priceId: string; stripeCustomerId: string },
  context: any
) => {
  return createCustomerSubscriptionApi(priceId, stripeCustomerId);
};

const createVendorSubscription = (
  parent: any,
  args: Record<string, CreateVendorSubscriptionInput>,
  context: any
) => {
  return createVendorSubscriptionApi(args.data);
};

export default {
  Mutation: {
    createStripeCustomer,
    createCustomerSubscription,
    createVendorSubscription,
  },
};
