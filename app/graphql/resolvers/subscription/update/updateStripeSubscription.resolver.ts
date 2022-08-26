import stripeService from "../../../../stripe/StripeService";
import { UpdateStripeSubscriptionInput } from "../../../resolvers-types.generated";

const updateStripeSubscription = async (
  parent: any,
  { data }: { data: UpdateStripeSubscriptionInput },
  context: any
) => {
  const { subscriptionId } = data;
  try {
    const subscription = await stripeService.getSubscription(subscriptionId);

    console.log(subscription.current_period_start);
    console.log(subscription.cancel_at_period_end);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    updateStripeSubscription,
  },
};
