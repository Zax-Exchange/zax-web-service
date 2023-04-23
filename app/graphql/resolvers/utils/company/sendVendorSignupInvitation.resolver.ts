import emailService from "../../../../gcp/EmailService";
import sequelize from "../../../../postgres/dbconnection";
import jwt from "jsonwebtoken";
import { users } from "../../../../db/models/users";
import { SendVendorSignupInvitationInput } from "../../../resolvers-types.generated";

const sendVendorSignupInvitation = async (
  parent: any,
  { data }: { data: SendVendorSignupInvitationInput }
) => {
  const { email } = data;

  try {
    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: email,
      subject: "Account Setup Invitation",
      html: `
          <p>Hi there, </p>
          <p>A customer of yours has invited you to create an account with Zax Exchange to collaborate with them! Please click the link below to get started.</p>
          <a href="${process.env.FRONTEND_URL}/vendor-signup">Click here</a>
          <br/>
          <p>- Zax Exchange Team</p>
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
    sendVendorSignupInvitation,
  },
};
