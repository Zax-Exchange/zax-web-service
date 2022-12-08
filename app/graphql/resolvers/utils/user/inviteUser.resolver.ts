import emailService from "../../../../gcp/EmailService";
import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import UserApiUtils from "../../../../utils/userUtils";
import { InviteUserInput } from "../../../resolvers-types.generated";

const inviteUsers = async (
  parent: any,
  { data }: { data: InviteUserInput[] },
  context: any
) => {
  try {
    await Promise.all(
      data.map(async (input) => {
        const { email, userId } = input;
        const [foundUser, user, companyId] = await Promise.all([
          sequelize.models.users.findOne({
            where: {
              email,
            },
          }),
          UserApiUtils.getUserWithUserId(userId),
          UserApiUtils.getUserCompanyId(userId),
        ]);

        if (foundUser) {
          throw ErrorUtils.duplicateEmailError();
        }

        await sequelize.models.pending_join_requests.destroy({
          where: {
            companyId,
            email,
          },
        });

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
      })
    );
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    inviteUsers,
  },
};
