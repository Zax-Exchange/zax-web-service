import sequelize from "../../postgres/dbconnection";
import emailService from "../../gcp/EmailService";
import CompanyApiUtils from "../utils/companyUtils";
import { stripe } from "./createSubscriptionsApis";
import { getSubscription } from "./getSubscriptionApis";

/**
 * updates subscription info in stripe
 * @param subscriptionId
 * @returns Boolean
 */
// TODO: should separate between vendor/customer
const updateSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await getSubscription(subscriptionId);

    console.log(subscription.current_period_start);
    console.log(subscription.cancel_at_period_end);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Updates company_plans subscription start/end date. This is the final step
 * for company signup.
 * @param subscriptionId
 * @returns Boolean
 */
const updateCompanyPlanSubscriptionInfo = async (subscriptionId: string) => {
  try {
    const subscription = await getSubscription(subscriptionId);
    const stripeCustomer = await sequelize.models.stripe_customers.findOne({
      where: {
        subscriptionId,
      },
    });

    const companyPlan = await sequelize.models.company_plans.findOne({
      where: {
        stripeCustomerId: stripeCustomer?.get("id"),
      },
    });

    // const encryptedCompanyId = CompanyApiUtils.encryptCompanyId(companyPlan?.get("companyId") as string);

    const options = {
      from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
      to: stripeCustomer?.get("email") as string,
      subject: "Zax Exchange Account Signup",
      html: `
          <p>Please follow the link below to complete sign up for your account.</p>
          <a href="http://localhost:3000/user-signup/${companyPlan?.get(
            "companyId"
          )}">Click here</a>
        `,
    };

    await emailService.sendMail(options);

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { updateSubscription, updateCompanyPlanSubscriptionInfo };
