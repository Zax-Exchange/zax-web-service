import emailService from "../../../../gcp/EmailService";
import sequelize from "../../../../postgres/dbconnection";
import TokenUtils from "../../../../utils/tokenUtils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ResendAccountSetupLinkInput } from "../../../resolvers-types.generated";

const resendAccountSetupLink = async (
  parent: any,
  { data }: { data: ResendAccountSetupLinkInput },
  context: any
) => {
  const { token } = data;

  let decodedJwt;
  try {
    decodedJwt = jwt.verify(
      token,
      process.env.USER_SIGNUP_TOKEN_SECRET!
    ) as JwtPayload;
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    const { companyId, userEmail } = decodedJwt;
    const tokenId = uuidv4();

    const expiringToken = TokenUtils.generateJwtToken(
      {
        id: tokenId,
        companyId,
      },
      process.env.USER_SIGNUP_TOKEN_SECRET!,
      {
        expiresIn: "24h",
      }
    );

    await sequelize.models.expiring_jwt_tokens.create({
      id: tokenId,
      token: expiringToken,
    });

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: userEmail,
      subject: "Zax Exchange Account Signup",
      html: `
            <p>Thanks for signing up with Zax!</p>
            <p>Please follow the link below to complete sign up for your account. The link will expire in 24 hours.</p>
            <a href="${process.env.FRONTEND_URL}/user-signup/${expiringToken}">Setup your account</a>
            <br/>
            <p>- Zax Exchange Team</p>
            `,
    };

    await emailService.sendMail(options);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    resendAccountSetupLink,
  },
};
