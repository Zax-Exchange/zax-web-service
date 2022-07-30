import EmailService from "../email/EmailService"
import CompanyApiUtils from "../utils/companyUtils"
import UserApiUtils from "../utils/userUtils"

const inviteUser = async (email: string, userId: number): Promise<Boolean> => {
  try {
    const user = await UserApiUtils.getUserWithUserId(userId);
    const encryptedCompanyId = await CompanyApiUtils.encryptCompanyId(user.companyId);

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to:email,
      subject: "Zax Exchange Account Signup",
      html: `
          <p>You have an invitation from ${user.name}</p>
          <p>Please follow the link below to complete sign up for your account.</p>
          <a href="http://localhost:4001/user-signup/${encryptedCompanyId}">Click here</a>
        `
    }

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