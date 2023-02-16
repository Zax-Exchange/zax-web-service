import emailService from "../../../../gcp/EmailService";
import sequelize from "../../../../postgres/dbconnection";
import UserApiUtils from "../../../../utils/userUtils";
import { ResetPasswordInput } from "../../../resolvers-types.generated";
import jwt, { JwtPayload } from "jsonwebtoken";
import { users } from "../../../../db/models/users";
import bcrypt from "bcryptjs";
import cacheService from "../../../../redis/CacheService";

const resetPassword = async (
  parent: any,
  { data }: { data: ResetPasswordInput }
) => {
  const { userId, password, token } = data;

  try {
    const user = (await sequelize.models.users.findByPk(userId)) as users;

    if (!user) return false;

    const decodedJwt = jwt.verify(
      token,
      process.env.USER_RESET_PASSWORD_TOKEN_SECRET! + user.password
    ) as JwtPayload;

    if (decodedJwt.exp && decodedJwt.exp * 1000 < Date.now()) {
      return false;
    }

    const encrypted = await bcrypt.hash(password, 10);

    await Promise.all([
      user.update({
        password: encrypted,
      }),
      cacheService.invalidateUserInCache(userId),
    ]);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    resetPassword,
  },
};
