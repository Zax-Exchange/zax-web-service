import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  apiVersion: "2020-08-27",
});

class StripeService {
  async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["plan"],
    });
  }

  async createCustomer(email: string) {
    return await stripe.customers.create({
      email,
    });
  }
}

const stripeService = new StripeService();
export default stripeService;
