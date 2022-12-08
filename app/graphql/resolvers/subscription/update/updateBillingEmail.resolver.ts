import { stripe_customers } from "../../../../models/stripe_customers";
import sequelize from "../../../../postgres/dbconnection";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import ErrorUtils from "../../../../utils/ErrorUtils";
import {
  UpdateBillingEmailInput,
  UpdateStripeSubscriptionInput,
} from "../../../resolvers-types.generated";

// TODO: finish imeplementation
const updateBillingEmail = async (
  parent: any,
  { data }: { data: UpdateBillingEmailInput },
  context: any
) => {
  const { email, companyId } = data;
  try {
    const [stripeCustomerInstance, found] = await Promise.all([
      sequelize.models.stripe_customers.findOne({
        where: {
          companyId,
        },
      }),
      sequelize.models.stripe_customers.findOne({
        where: {
          email,
        },
      }),
    ]);

    if (found) {
      throw ErrorUtils.duplicateEmailError();
    }

    await sequelize.transaction(async (transaction) => {
      try {
        await (stripeCustomerInstance as stripe_customers).update(
          {
            email,
          },
          { transaction }
        );
        await stripe.customers.update(
          (stripeCustomerInstance as stripe_customers).customerId,
          {
            email,
          }
        );
      } catch (error) {
        transaction.rollback();
        throw error;
      }
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    updateBillingEmail,
  },
};
