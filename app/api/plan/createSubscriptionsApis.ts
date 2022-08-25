import { Stripe } from "stripe";
import sequelize from "../../postgres/dbconnection";
import { v4 as uuidv4 } from "uuid";
import { CreateVendorSubscriptionInput } from "../../graphql/resolvers-types.generated";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  apiVersion: "2020-08-27",
});

/**
 * Creates/Finds a stripe_customer and returns its id
 * @param email
 * @returns stripeCustomerId
 */
const createStripeCustomer = async (email: string): Promise<string> => {
  try {
    return await sequelize.models.stripe_customers
      .findOrCreate({
        where: {
          email,
        },
        defaults: {
          id: uuidv4(),
          email,
        },
      })
      .then(async ([foundCustomer, created]) => {
        if (created) {
          const customer = await stripe.customers.create({
            email,
          });
          foundCustomer.set("customerId", customer.id);
          foundCustomer.save();
          return customer.id;
        } else {
          return foundCustomer.get("customerId") as string;
        }
      });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Creates a customer stripe subscription
 * @param priceId
 * @param stripeCustomerId
 * @returns
 */
const createCustomerSubscription = async (
  priceId: string,
  stripeCustomerId: string
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

const createVendorSubscription = async (
  data: CreateVendorSubscriptionInput
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

/**
 * Check if email is duplicate when signing up
 * @param email
 * @returns
 */
const checkUserEmail = async (email: string) => {
  try {
    const customer = await sequelize.models.stripe_customers.findOne({
      where: {
        email,
      },
    });

    if (customer) return true;
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};
export {
  createStripeCustomer,
  createCustomerSubscription,
  createVendorSubscription,
  checkUserEmail,
};
