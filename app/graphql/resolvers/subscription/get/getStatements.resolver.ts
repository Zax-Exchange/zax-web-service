import { stripe_customers } from "../../../../models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import ErrorUtils from "../../../../utils/ErrorUtils";
import { GetStatementsInput } from "../../../resolvers-types.generated";

const getStatements = async (
  parent: any,
  { data }: { data: GetStatementsInput },
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
      features: { invoice_history: { enabled: true } },
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerInstance.customerId,
      return_url: "http://localhost:3000",
    });

    return session.url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getStatements,
  },
};
