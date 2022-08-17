import EmailService from "../email/EmailService"
import CompanyApiUtils from "../utils/companyUtils"
import UserApiUtils from "../utils/userUtils"

const inviteUser = async (email: string, userId: string): Promise<Boolean> => {
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

    await EmailService.sendMail(options);
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export {
  inviteUser
}