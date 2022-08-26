// TODO: should also update company isActive status once subscription ends (https://stripe.com/docs/billing/subscriptions/webhooks)

import sequelize from "../../../../postgres/dbconnection";
import { stripe } from "../../../../stripe/StripeService";
import { CancelStripeSubscriptionInput } from "../../../resolvers-types.generated";

/** Cancels company subscription in stripe, terminates their membership until current plan's last day */
const cancelStripeSubscription = async (
  parent: any,
  { data }: { data: CancelStripeSubscriptionInput },
  context: any
) => {
  const { email } = data;
  try {
    const stripe_customers = sequelize.models.stripe_customers;
    const customer = await stripe_customers.findOne({
      where: {
        email,
      },
    });
    const subscriptionId = customer?.get("subscriptionId") as string;

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    cancelStripeSubscription,
  },
};
