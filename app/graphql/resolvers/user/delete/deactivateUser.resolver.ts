import sequelize from "../../../../postgres/dbconnection";
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
    await users.update(
      {
        isActive: false,
      },
      {
        where: { email },
      }
    );
    await users.destroy({
      where: {
        email,
      },
      individualHooks: true,
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
