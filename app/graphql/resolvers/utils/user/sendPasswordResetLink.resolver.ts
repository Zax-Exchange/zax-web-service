import emailService from "../../../../gcp/EmailService";
import sequelize from "../../../../postgres/dbconnection";
import UserApiUtils from "../../../../utils/userUtils";
import { SendPasswordResetLinkInput } from "../../../resolvers-types.generated";
import jwt from "jsonwebtoken";
import { users } from "../../../../models/users";

const sendPasswordResetLink = async (
  parent: any,
  { data }: { data: SendPasswordResetLinkInput }
) => {
  const { email } = data;

  try {
    const user = (await sequelize.models.users.findOne({
      where: {
        email,
      },
    })) as users;

    if (!user) return false;

    // add password to secret so that after user successfully resets the password, the secret will no longer work
    const expiringToken = jwt.sign(
      {},
      process.env.USER_RESET_PASSWORD_TOKEN_SECRET! + user.password,
      {
        expiresIn: "1h",
      }
    );

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: email,
      subject: "Zax Exchange Password Reset",
      html: `
          <p>You have request a password reset.</p>
          <p>Please follow the link below to reset your password. The link will expire in 1 hour.</p>
          <a href="http://localhost:3000/reset-password/${user.id}/${expiringToken}">Click here</a>
        `,
    };
    emailService.sendMail(options);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    sendPasswordResetLink,
  },
};
