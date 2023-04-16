import sequelize from "../../../../postgres/dbconnection";
import { v4 as uuidv4 } from "uuid";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import {
  CreateStripeCustomerInStripeForCustomerInput,
  StripePaymentIntent,
} from "../../../resolvers-types.generated";
import Stripe from "stripe";
import { stripe_customers } from "../../../../db/models/stripe_customers";
import e from "express";

/** Creates a customer instance in stripe, attaches a subscription to the customer instance and returns the payment intent*/
const createStripeCustomerInStripeForCustomer = async (
  parent: any,
  { data }: { data: CreateStripeCustomerInStripeForCustomerInput },
  context: any
) => {
  const { companyId, priceId } = data;
  try {
    const stripeCustomerUuidInZax = uuidv4();

    const stripeCustomerInstanceInZax =
      (await sequelize.models.stripe_customers.findOne({
        where: {
          companyId,
        },
      })) as stripe_customers | null;

    const customer = stripeCustomerInstanceInZax
      ? await stripeService.getCustomer(stripeCustomerInstanceInZax.customerId)
      : await stripeService.createCustomer(companyId);

    if (stripeCustomerInstanceInZax) {
      // if we've already created the stripe_customer instance we retreive the previously created subscription (not paid yet)
      // and use the existing payment intent so we don't create multiple unpaid payment intents
      const existingSub = await stripe.subscriptions.retrieve(
        stripeCustomerInstanceInZax.subscriptionId,
        {
          expand: ["latest_invoice.payment_intent"],
        }
      );
      let invoice = existingSub.latest_invoice as Stripe.Invoice;
      let intent = invoice.payment_intent as Stripe.PaymentIntent;

      if (intent.status === "succeeded" || intent.status === "canceled") {
        // if user cancels plan, we cannot use the existing payment intent, so create a new one
        const newSub = await stripe.subscriptions.create({
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
        invoice = newSub.latest_invoice as Stripe.Invoice;
        intent = invoice.payment_intent as Stripe.PaymentIntent;
      }

      return {
        customerId: customer.id,
        clientSecret: intent.client_secret,
        subscriptionId: existingSub.id,
      } as StripePaymentIntent;
    } else {
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

      // record the customer's stripe info in zax
      await sequelize.models.stripe_customers.create({
        id: stripeCustomerUuidInZax,
        customerId: customer.id,
        subscriptionId: subscription.id,
        companyId,
      });

      return {
        customerId: customer.id,
        clientSecret: intent.client_secret,
        subscriptionId: subscription.id,
      } as StripePaymentIntent;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createStripeCustomerInStripeForCustomer,
  },
};
