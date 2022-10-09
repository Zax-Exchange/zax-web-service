import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { UpdateUserPowerInput } from "../../../resolvers-types.generated";

const updateUserPower = async (
  parent: any,
  { data }: { data: UpdateUserPowerInput },
  context: any
) => {
  const { userId, isAdmin } = data;
  try {
    await sequelize.models.users.update(
      {
        isAdmin,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    await cacheService.invalidateUserInCache(userId);
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: { updateUserPower },
};
