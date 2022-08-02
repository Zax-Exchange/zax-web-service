import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  "apiVersion": "2020-08-27"
});


const createStripeCustomer = async (email: string): Promise<string> => {
  try {
    const customer = await stripe.customers.create({
      email
    });

    return customer.id
  } catch (error) {
    return Promise.reject(error);
  }
}

const createSubscription = async (priceId: string, customerId: string) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
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