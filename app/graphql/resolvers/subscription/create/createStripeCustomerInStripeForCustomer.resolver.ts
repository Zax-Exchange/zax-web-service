import sequelize from "../../../../postgres/dbconnection";
import { v4 as uuidv4 } from "uuid";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import {
  CreateStripeCustomerInStripeForCustomerInput,
  StripePaymentIntent,
} from "../../../resolvers-types.generated";
import Stripe from "stripe";

/** Creates a customer instance in stripe, attaches a subscription to the customer instance and returns the payment intent*/
const createStripeCustomerInStripeForCustomer = async (
  parent: any,
  { data }: { data: CreateStripeCustomerInStripeForCustomerInput },
  context: any
) => {
  const { email, priceId } = data;
  try {
    const customer = await stripeService.createCustomer(email);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
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
    createStripeCustomerInStripeForCustomer,
  },
};