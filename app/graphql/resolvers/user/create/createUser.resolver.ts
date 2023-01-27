import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";
import {
  CreateUserInput,
  LoggedInUser,
  UserPower,
  UserStatus,
} from "../../../resolvers-types.generated";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import streamService from "../../../../stream/StreamService";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorUtils from "../../../../utils/ErrorUtils";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import { company_plans } from "../../../../models/company_plans";
import { stripe_customers } from "../../../../models/stripe_customers";
import { companies } from "../../../../models/companies";
import NotificationService from "../../../../notification/NotificationService";
import { USER_SIGNUP_ROUTE } from "../../../../notification/notificationRoutes";
import { expiring_jwt_tokens } from "../../../../models/expiring_jwt_tokens";

const createUser = async (
  parent: any,
  { data }: { data: CreateUserInput },
  context: any
) => {
  const users = sequelize.models.users;
  const { name, email, password, token } = data;
  let decodedJwt;
  try {
    decodedJwt = jwt.verify(
      token,
      process.env.USER_SIGNUP_TOKEN_SECRET!
    ) as JwtPayload;

    // check if token expired, since user could theoretically stays on signup page for an extended period of time without signin up
    if (decodedJwt.exp && decodedJwt.exp * 1000 < Date.now()) {
      throw ErrorUtils.expiredTokenError();
    } else {
      // delete the token in db
    }
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    const { id: tokenId, companyId } = decodedJwt;

    const foundUser = await users.findOne({
      where: {
        email,
      },
    });
    if (foundUser) {
      throw ErrorUtils.duplicateEmailError();
    }

    return await sequelize.transaction(async (transaction) => {
      const [isFirst, isVendor, adminIds, companyPlan, _] = await Promise.all([
        UserApiUtils.isUserFirstInCompany(companyId),
        CompanyApiUtils.isVendorWithCompanyId(companyId),
        CompanyApiUtils.getAllCompanyAdmins(companyId),
        sequelize.models.company_plans.findOne({ where: { companyId } }),
        sequelize.models.pending_join_requests.destroy({
          where: {
            email,
          },
          transaction,
        }),
      ]);
      const encrypted = await bcrypt.hash(password, 10);

      const user = await users
        .create(
          {
            id: uuidv4(),
            companyId,
            name,
            email: email.toLowerCase(),
            password: encrypted,
            status: UserStatus.Active,
            power: isFirst ? UserPower.Admin : UserPower.User,
            isVendor,
          },
          {
            transaction,
          }
        )
        .then((u) => u.get({ plain: true }));

      // If user is not the first one, we need to update in stripe to add one more user monthly charge
      if (!isFirst) {
        const stripeCustomer = await (
          companyPlan as company_plans
        ).getStripe_customer();

        const sub = await stripeService.getSubscription(
          stripeCustomer.subscriptionId!
        );

        if (!isVendor) {
          // always_invoice here will charge the company directly of the prorated amount based on billing cycle
          // and starting with next billing cycle charge the full amount
          await stripe.subscriptions.update(sub.id, {
            proration_behavior: "always_invoice",
            items: sub.items.data.map((item) => {
              return {
                id: item.id,
                quantity: item.quantity! + 1,
              };
            }),
          });
        } else {
          await stripe.subscriptions.update(sub.id, {
            proration_behavior: "always_invoice",
            items: [
              {
                id: sub.items.data[0].id,
              },
              {
                id: sub.items.data[1].id,
                quantity: sub.items.data[1].quantity! + 1,
              },
            ],
          });
        }
      }

      await sequelize.models.expiring_jwt_tokens.destroy({
        where: {
          id: tokenId,
        },
        transaction,
      });
      const chatToken = streamService.createToken(companyId);

      const loggedInUser = {
        id: user.id,
        companyId: user.companyId,
        name: user.name,
        email: user.email,
        power: user.power,
        isVendor: user.isVendor,
        chatToken,
      };
      const sessionToken = jwt.sign(
        loggedInUser,
        process.env.USER_SESSION_TOKEN_SECRET!,
        {
          expiresIn: "8h",
        }
      );

      NotificationService.sendNotification(USER_SIGNUP_ROUTE, {
        data: {
          message: `app.notification.company.newUser`,
          userName: user.name,
        },
        receivers: adminIds,
      });
      return {
        ...loggedInUser,
        token: sessionToken,
      } as LoggedInUser;
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createUser,
  },
};
