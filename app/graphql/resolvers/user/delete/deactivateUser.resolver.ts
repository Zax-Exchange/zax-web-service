import { stripe_customers } from "../../../../models/stripe_customers";
import { users } from "../../../../models/users";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import {
  DeactivateUserInput,
  UserStatus,
} from "../../../resolvers-types.generated";

// TODO: should update company stripe subscription to decrease user count/charge
const deactivateUser = async (
  parent: any,
  { data }: { data: DeactivateUserInput },
  context: any
) => {
  const { userIds, companyId } = data;
  const users = sequelize.models.users;

  try {
    await sequelize.transaction(async (transaction) => {
      const stripeCustomer = (await sequelize.models.stripe_customers.findOne({
        where: {
          companyId,
        },
      })) as stripe_customers;

      const sub = await stripeService.getSubscription(
        stripeCustomer.subscriptionId!
      );

      const userUpdates = userIds.map((id) => {
        return sequelize.models.users.update(
          {
            status: UserStatus.Inactive,
          },
          {
            where: {
              id,
            },
            transaction,
          }
        );
      });

      const cacheUpdates = userIds.map((id) => {
        return cacheService.invalidateUserInCache(id);
      });
      await Promise.all([
        ...userUpdates,
        ...cacheUpdates,
        stripe.subscriptions.update(sub.id, {
          proration_behavior: "always_invoice",
          items: sub.items.data.map((item) => {
            return {
              id: item.id,
              quantity: item.quantity! - 1,
            };
          }),
        }),
      ]);
    });

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deactivateUser,
  },
};
