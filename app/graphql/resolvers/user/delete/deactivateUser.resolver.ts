import { users } from "../../../../models/users";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeactivateUserInput } from "../../../resolvers-types.generated";

// TODO: should update company stripe subscription to decrease user count/charge
const deactivateUser = async (
  parent: any,
  { data }: { data: DeactivateUserInput },
  context: any
) => {
  const { email } = data;
  const users = sequelize.models.users;

  try {
    const user = await users.findOne({ where: { email } });
    await user?.update({
      isActive: false,
    });
    // await users.update(
    //   {
    //     isActive: false,
    //   },
    //   {
    //     where: { email },
    //   }
    // );
    // await users.destroy({
    //   where: {
    //     email,
    //   },
    //   individualHooks: true,
    // });
    if (user !== null) {
      const userId = (user as users).id
      await cacheService.invalidateUserInCache(userId);
    }
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
