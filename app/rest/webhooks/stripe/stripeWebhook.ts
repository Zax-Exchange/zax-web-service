import express from "express";
import Stripe from "stripe";
import { stripe_customers } from "../../../db/models/stripe_customers";
import sequelize from "../../../postgres/dbconnection";
import { stripe } from "../../../stripe/StripeService";
import emailService from "../../../gcp/EmailService";
import { CompanyPlanType } from "../../../graphql/resolvers-types.generated";
import { company_plans } from "../../../db/models/company_plans";
import NotificationService from "../../../notification/NotificationService";
import { USER_RELOAD_ROUTE } from "../../../notification/notificationRoutes";
import { companies } from "../../../db/models/companies";

const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET!;

router.post(
  "",
  // express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig!,
        endpointSecret
      );
    } catch (err: any) {
      console.log(err);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      console.log(event.type);

      switch (event.type) {
        case "charge.failed":
          const chargeFailed = event.data.object;
          console.log(chargeFailed);
          // Then define and call a function to handle the event charge.failed
          break;

        case "customer.subscription.updated":
          const sub = event.data.object as Stripe.Subscription;
          const cus = (await stripe.customers.retrieve(
            sub.customer as string
          )) as Stripe.Customer;
          const stripeCustomerUuidInZax =
            await sequelize.models.stripe_customers
              .findOne({
                where: {
                  customerId: cus.id,
                },
              })
              .then(
                (stripeCustomerInstance) =>
                  stripeCustomerInstance?.get("id") as string
              );

          const customerCompanyPlanInstance =
            (await sequelize.models.company_plans.findOne({
              where: {
                stripeCustomerId: stripeCustomerUuidInZax,
              },
            })) as company_plans;

          if (sub.cancel_at_period_end) {
            // const options = {
            //   from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
            //   to: cus.email || "",
            //   subject: "Subscription Cancellation Request",
            //   html: `
            //   <p>We have received your request to cancel your subscription. You're subscription will be cancelled on ${new Date(
            //     (sub.cancel_at as number) * 1000
            //   ).toLocaleDateString()}. You will still have access in the mean time.</p>
            //   <p>If you wish to resume your subscription, please login and navigate to Manage Subscription/Billing in the Settings page.</p>
            // `,
            // };
            // emailService.sendMail(options);
          } else {
            // if customer decides to renew the plan before plan cancels, we update
            // await customerCompanyPlanInstance.update({
            //   planType: CompanyPlanType.Paid,
            // });
          }
          // const userList: string[] = await sequelize.models.companies
          //   .findByPk(customerCompanyPlanInstance.companyId)
          //   .then(async (comp) => {
          //     return await (comp as companies).getUsers().then((list) =>
          //       list.map((u) => {
          //         return u.get("id");
          //       })
          //     );
          //   });
          // NotificationService.sendNotification(USER_RELOAD_ROUTE, {
          //   data: {
          //     message: "",
          //   },
          //   receivers: userList,
          // });
          break;
        case "customer.subscription.deleted":
          // NOTE: failed upgrade from a free user will also trigger this event
          // when subscription ends, refund the customer balance if any
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          const customer = (await stripe.customers.retrieve(
            customerId
          )) as Stripe.Customer;
          const payedInvoicesList = await stripe.invoices.list({
            customer: customerId,
          });

          const stripeCustomerInstance =
            (await sequelize.models.stripe_customers.findOne({
              where: {
                customerId: subscription.customer,
              },
            })) as stripe_customers;

          if (customer.balance < 0) {
            await Promise.all([
              stripe.refunds.create({
                charge: payedInvoicesList.data[0].charge as string,
                amount: customer.balance * -1,
              }),
              stripe.customers.update(customerId, {
                balance: 0,
              }),
            ]);
          }

          if (stripeCustomerInstance) {
            await Promise.all([
              sequelize.models.company_plans.update(
                {
                  planType: CompanyPlanType.Free,
                },
                {
                  where: {
                    companyId: stripeCustomerInstance.companyId,
                  },
                }
              ),
            ]);
          }
          break;
      }
      return response.sendStatus(200);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  }
);

export default router;
