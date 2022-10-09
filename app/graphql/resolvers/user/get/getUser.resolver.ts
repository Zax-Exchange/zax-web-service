import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { GetUserInput, User } from "../../../resolvers-types.generated";

const getUser = async (
  parent: any,
  { data }: { data: GetUserInput },
  context: any
) => {
  const { userId } = data;
  const users = sequelize.models.users;
  try {
    // return cached value if value is in cache
    const userInCache = await cacheService.getUserInCache(userId);
    if (userInCache !== null) {
      return userInCache;
    }

    // since value not in cache retrieve the value from DB
    const userInDb = await users
      .findByPk(userId)
      .then((u) => u?.get({ plain: true }) as User);
    
    // store the value into cache and then return it
    cacheService.setUserInCache(userInDb);  // do this async, its OK if it fails
    return userInDb;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getUser,
  },
};
