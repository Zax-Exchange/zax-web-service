import { USER_LOGOUT_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { UpdateUserPowerInput } from "../../../resolvers-types.generated";

const updateUserPower = async (
  parent: any,
  { data }: { data: UpdateUserPowerInput[] },
  context: any
) => {
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map(async (input) => {
          const { userId, power } = input;
          return sequelize.models.users.update(
            {
              power,
            },
            {
              where: {
                id: userId,
              },
              transaction,
            }
          );
        })
      );
    });
    await Promise.all(
      data.map(async (input) => {
        const { userId } = input;
        return cacheService.invalidateUserInCache(userId);
      })
    );
    NotificationService.sendNotification(USER_LOGOUT_ROUTE, {
      data: {
        message: "",
      },
      receivers: data.map((user) => user.userId),
    });
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: { updateUserPower },
};
