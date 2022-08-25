import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../utils/userUtils";
import bcrypt from "bcryptjs";
import {
  UpdateUserInput,
  UpdateUserPasswordInput,
  UpdateUserPowerInput,
} from "../../graphql/resolvers-types.generated";

const updateUser = async (data: UpdateUserInput) => {
  const users = sequelize.models.users;
  const id = data.id;
  try {
    await users.update(
      { name: data.name },
      {
        where: { id },
      }
    );
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const updateUserPassword = async ({
  id,
  currentPassword,
  newPassword,
}: UpdateUserPasswordInput) => {
  try {
    const user = await sequelize.models.users.findByPk(id);

    const valid = await bcrypt.compare(
      currentPassword,
      user?.get("password") as string
    );

    if (!valid) throw new Error("Incorrect current password.");

    const encrypted = await bcrypt.hash(newPassword, 10);
    await user?.update({
      password: encrypted,
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
const updateUserPower = async ({ isAdmin, id }: UpdateUserPowerInput) => {
  try {
    await sequelize.models.users.update(
      {
        isAdmin,
      },
      {
        where: {
          id,
        },
      }
    );
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { updateUser, updateUserPassword, updateUserPower };
