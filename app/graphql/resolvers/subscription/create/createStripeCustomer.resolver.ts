import sequelize from "../../../../postgres/dbconnection";
import { v4 as uuidv4 } from "uuid";
import stripeService from "../../../../stripe/StripeService";
import { CreateStripeCustomerInput } from "../../../resolvers-types.generated";

/** Creates/Finds a stripe_customer and creates a customer instance in stripe and returns its id */
const createStripeCustomer = async (
  parent: any,
  { data }: { data: CreateStripeCustomerInput },
  context: any
) => {
  const { email } = data;
  try {
    return await sequelize.models.stripe_customers
      .findOrCreate({
        where: {
          email,
        },
        defaults: {
          id: uuidv4(),
          email,
        },
      })
      .then(async ([customerInstance, created]) => {
        if (created) {
          const customer = await stripeService.createCustomer(email);
          customerInstance.set("customerId", customer.id);
          customerInstance.save();
          return customer.id;
        } else {
          return customerInstance.get("customerId") as string;
        }
      });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createStripeCustomer,
  },
};
