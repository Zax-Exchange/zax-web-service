import sequelize from "../../../../postgres/dbconnection";
import { GetUserInput, User } from "../../../resolvers-types.generated";

const getUser = async (
  parent: any,
  { data }: { data: GetUserInput },
  context: any
) => {
  const { userId } = data;
  const users = sequelize.models.users;
  try {
    return await users
      .findByPk(userId)
      .then((u) => u?.get({ plain: true }) as User);
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
