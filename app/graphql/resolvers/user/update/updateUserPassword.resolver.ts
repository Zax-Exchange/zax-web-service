import sequelize from "../../../../postgres/dbconnection";
import { UpdateUserPasswordInput } from "../../../resolvers-types.generated";
import bcrypt from "bcryptjs";

const updateUserPassword = async (
  parent: any,
  { data }: { data: UpdateUserPasswordInput },
  context: any
) => {
  const { userId, currentPassword, newPassword } = data;
  try {
    const user = await sequelize.models.users.findByPk(userId);

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

export default {
  Mutation: { updateUserPassword },
};
