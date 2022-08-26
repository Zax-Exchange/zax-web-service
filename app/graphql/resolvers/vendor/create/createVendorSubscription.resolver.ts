import Stripe from "stripe";
import sequelize from "../../../../postgres/dbconnection";
import { stripe } from "../../../../stripe/StripeService";
import { CreateVendorSubscriptionInput } from "../../../resolvers-types.generated";

const createVendorSubscription = async (
  parent: any,
  { data }: { data: CreateVendorSubscriptionInput },
  context: any
) => {
  const { subscriptionPriceId, perUserPriceId, stripeCustomerId } = data;

  try {
    const customer = await sequelize.models.stripe_customers.findOne({
      where: {
        customerId: stripeCustomerId,
      },
    });
    // TODO: review vendor pricing model
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [
        {
          price: subscriptionPriceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    customer?.update({
      subscriptionId: subscription.id,
    });
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const intent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: intent.client_secret,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  Mutation: {
    createVendorSubscription,
  },
};
