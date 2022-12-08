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
import jwt from "jsonwebtoken";
import ErrorUtils from "../../../../utils/ErrorUtils";
import stripeService, { stripe } from "../../../../stripe/StripeService";
import { company_plans } from "../../../../models/company_plans";
import { stripe_customers } from "../../../../models/stripe_customers";
import { companies } from "../../../../models/companies";
import NotificationService from "../../../../notification/NotificationService";
import { USER_SIGNUP_ROUTE } from "../../../../notification/notificationRoutes";

const createUser = async (
  parent: any,
  { data }: { data: CreateUserInput },
  context: any
) => {
  const users = sequelize.models.users;

  const { name, email, companyId, password } = data;
  try {
    const foundUser = await users.findOne({
      where: {
        email,
      },
    });
    if (foundUser) {
      throw ErrorUtils.duplicateEmailError();
    }

    const [isFirst, isVendor, adminIds, companyPlan, _] = await Promise.all([
      UserApiUtils.isUserFirstInCompany(companyId),
      CompanyApiUtils.isVendorWithCompanyId(companyId),
      CompanyApiUtils.getAllCompanyAdmins(companyId),
      sequelize.models.company_plans.findOne({ where: { companyId } }),
      sequelize.models.pending_join_requests.destroy({
        where: {
          email,
        },
      }),
    ]);

    // If user is not the first one, we need to update in stripe to add one more user monthly charge
    if (!isFirst && !isVendor) {
      const stripeCustomer = await (
        companyPlan as company_plans
      ).getStripe_customer();

      const sub = await stripeService.getSubscription(
        stripeCustomer.subscriptionId!
      );

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
    }
    const encrypted = await bcrypt.hash(password, 10);

    const user = await users
      .create({
        id: uuidv4(),
        companyId,
        name,
        email: email.toLowerCase(),
        password: encrypted,
        status: UserStatus.Active,
        power: isFirst ? UserPower.Admin : UserPower.User,
        isVendor,
      })
      .then((u) => u.get({ plain: true }));

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
    const token = jwt.sign(
      loggedInUser,
      process.env.USER_SESSION_TOKEN_SECRET!,
      {
        expiresIn: "8h",
      }
    );

    NotificationService.sendNotification(USER_SIGNUP_ROUTE, {
      data: {
        message: `${name} has joined your company!`,
      },
      receivers: adminIds,
    });
    return {
      ...loggedInUser,
      token,
    } as LoggedInUser;
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
