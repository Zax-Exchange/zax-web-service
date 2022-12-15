import express from "express";
import Stripe from "stripe";
import { stripe_customers } from "../../../models/stripe_customers";
import sequelize from "../../../postgres/dbconnection";
import { stripe } from "../../../stripe/StripeService";

const router = express.Router();
const endpointSecret =
  "whsec_91b4af3f2ef960a57afe75b734da1b2e83e779a7ae02696457ee52e961b24fd2";

router.post("", async (request, response) => {
  const sig = request.headers["stripe-signature"];
  console.log("webhookk hit");
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig!, endpointSecret);
  } catch (err: any) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    switch (event.type) {
      case "customer.subscription.deleted":
        // when subscription ends, refund the customer balance
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

        await Promise.all([
          sequelize.models.companies.update(
            {
              isActive: false,
            },
            {
              where: {
                id: stripeCustomerInstance.companyId,
              },
            }
          ),
          stripe.refunds.create({
            charge: payedInvoicesList.data[0].charge as string,
            amount: customer.balance,
          }),
          stripe.customers.update(customerId, {
            balance: 0,
          }),
        ]);
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
    }
  } catch (error) {}
});

export default router;
