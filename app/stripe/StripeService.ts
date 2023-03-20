import Stripe from "stripe";
import sequelize from "../postgres/dbconnection";
import { companies } from "../db/models/companies";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

class StripeService {
  async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["plan"],
    });
  }

  async getCustomer(customerId: string) {
    return await stripe.customers.retrieve(customerId);
  }

  async createCustomer(companyId: string) {
    const companyInstance = (await sequelize.models.companies.findByPk(
      companyId
    )) as companies;

    return await stripe.customers.create({
      name: companyInstance.name,
      metadata: {
        companyId,
      },
    });
  }
}

const stripeService = new StripeService();
export default stripeService;
