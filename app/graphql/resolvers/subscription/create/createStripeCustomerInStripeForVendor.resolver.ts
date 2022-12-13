import Stripe from "stripe";
import sequelize from "../../../../postgres/dbconnection";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import {
  CreateStripeCustomerInStripeForVendorInput,
  StripePaymentIntent,
} from "../../../resolvers-types.generated";

const createStripeCustomerInStripeForVendor = async (
  parent: any,
  { data }: { data: CreateStripeCustomerInStripeForVendorInput },
  context: any
) => {
  const { email, subscriptionPriceId, perUserPriceId } = data;
  try {
    const customer = await stripeService.createCustomer(email);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: subscriptionPriceId,
          quantity: 1,
        },
        {
          price: perUserPriceId,
          quantity: 1,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      proration_behavior: "none",
      expand: ["latest_invoice.payment_intent"],
    });
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const intent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      customerId: customer.id,
      clientSecret: intent.client_secret,
      subscriptionId: subscription.id,
    } as StripePaymentIntent;
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  Mutation: {
    createStripeCustomerInStripeForVendor,
  },
};
