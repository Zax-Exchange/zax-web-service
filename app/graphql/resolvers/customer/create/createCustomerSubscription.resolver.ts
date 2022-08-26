import Stripe from "stripe";
import sequelize from "../../../../postgres/dbconnection";
import { stripe } from "../../../../stripe/StripeService";

const createCustomerSubscription = async (
  parent: any,
  { priceId, stripeCustomerId }: { priceId: string; stripeCustomerId: string },
  context: any
) => {
  try {
    const customer = await sequelize.models.stripe_customers.findOne({
      where: {
        customerId: stripeCustomerId,
      },
    });
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [
        {
          price: priceId,
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
    createCustomerSubscription,
  },
};
