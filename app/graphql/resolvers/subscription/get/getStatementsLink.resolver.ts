import Stripe from "stripe";
import { stripe_customers } from "../../../../db/models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import ErrorUtils from "../../../../utils/ErrorUtils";
import { GetStatementsLinkInput } from "../../../resolvers-types.generated";

const getStatementsLink = async (
  parent: any,
  { data }: { data: GetStatementsLinkInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const stripeCustomerInstance =
      (await sequelize.models.stripe_customers.findOne({
        where: {
          companyId,
        },
      })) as stripe_customers;

    if (!stripeCustomerInstance) {
      throw ErrorUtils.notFoundError();
    }

    const configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "Zax Exchange partners with Stripe for simplified billing.",
      },
      features: {
        invoice_history: { enabled: true },
        payment_method_update: {
          enabled: true,
        },
        customer_update: {
          allowed_updates: ["email", "address"],
          enabled: true,
        },
        subscription_cancel: {
          enabled: true,
        },
      },
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerInstance.customerId,
      configuration: configuration.id,
    });

    return session.url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getStatementsLink,
  },
};
