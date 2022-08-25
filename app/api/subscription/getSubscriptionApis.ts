import { stripe } from "./createSubscriptionsApis";

const getSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return subscription;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getSubscription };
