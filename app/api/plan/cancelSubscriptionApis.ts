
import sequelize from "../../postgres/dbconnection"
import { stripe } from "./createSubscriptionsApis";


// TODO: should also update company isActive status once subscription ends (https://stripe.com/docs/billing/subscriptions/webhooks)
const cancelSubscription = async (email: string) => {
  try {
    const stripe_customers = sequelize.models.stripe_customers;
    const customer = await stripe_customers.findOne({
      where: {
        email
      }
    })
    const subscriptionId = customer?.get("subscriptionId") as string;

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    })
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  cancelSubscription
}