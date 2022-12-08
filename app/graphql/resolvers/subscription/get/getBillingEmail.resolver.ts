import { stripe_customers } from "../../../../models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import ErrorUtils from "../../../../utils/ErrorUtils";
import { GetBillingEmailInput } from "../../../resolvers-types.generated";

const getBillingEmail = async (
  parent: any,
  { data }: { data: GetBillingEmailInput },
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

    return stripeCustomerInstance.email;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getBillingEmail,
  },
};
