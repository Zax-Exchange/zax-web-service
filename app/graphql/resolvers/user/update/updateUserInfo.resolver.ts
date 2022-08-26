import sequelize from "../../../../postgres/dbconnection";
import { UpdateUserInfoInput } from "../../../resolvers-types.generated";

const updateUserInfo = async (
  parent: any,
  { data }: { data: UpdateUserInfoInput },
  context: any
) => {
  const users = sequelize.models.users;
  const { userId, name } = data;
  try {
    await users.update(
      { name: name },
      {
        where: { id: userId },
      }
    );
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

export default {
  Mutation: { updateUserInfo },
};
