import emailService from "../../../../gcp/EmailService";
import UserApiUtils from "../../../../utils/userUtils";
import { InviteUserInput } from "../../../resolvers-types.generated";

const inviteUser = async (
  parent: any,
  { data }: { data: InviteUserInput },
  context: any
) => {
  const { email, userId } = data;
  try {
    const user = await UserApiUtils.getUserWithUserId(userId);

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: email,
      subject: "Zax Exchange Account Signup",
      html: `
          <p>You have an invitation from ${user.name}</p>
          <p>Please follow the link below to complete sign up for your account.</p>
          <a href="http://localhost:3000/user-signup/${user.companyId}">Click here</a>
        `,
    };

    await emailService.sendMail(options);
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
