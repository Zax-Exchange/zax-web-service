import { Stripe } from "stripe";
import sequelize from "../../postgres/dbconnection";
import { stripe_customers } from "../models/stripe_customers";
import { v4 as uuidv4 } from "uuid";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  "apiVersion": "2020-08-27"
});

/**
 * Creates/Finds a stripe_customer and returns its id
 * @param email 
 * @returns stripeCustomerId
 */
const createStripeCustomer = async (email: string): Promise<string> => {

  try {
    const stripeCustomerId = await sequelize.models.stripe_customers.findOrCreate({
      where: {
        email
      },
      defaults: {
        id: uuidv4(),
        email,
      }
    })
    .then(async ([foundCustomer, created]) => {
      if (created) {
        const customer = await stripe.customers.create({
          email
        });
        foundCustomer.set("customerId", customer.id);
        foundCustomer.save();
        return customer.id;
      }
      return foundCustomer.get("customerId") as string;
    });

    return stripeCustomerId;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Creates a stripe subscription
 * @param priceId 
 * @param customerId 
 * @returns 
 */
const createSubscription = async (priceId: string, customerId: string) => {
  try {
    const customer = await sequelize.models.stripe_customers.findOne({
      where: {
        customerId
      }
    });
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    customer?.update({
      subscriptionId: subscription.id
    })
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const intent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: intent.client_secret
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  createStripeCustomer,
  createSubscription
}