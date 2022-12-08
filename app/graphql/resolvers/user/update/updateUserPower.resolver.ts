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
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: { updateUserPower },
};
