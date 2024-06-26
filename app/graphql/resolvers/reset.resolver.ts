import sequelize from "../../postgres/dbconnection";
import elasticClient from "../../elastic/elasticConnection";
import { stripe } from "../../stripe/StripeService";

const reset = async () => {
  try {
    Promise.all([
      elasticClient.indices.delete({ index: "project" }),
      elasticClient.indices.exists({ index: "vendor" }),
      sequelize.models.companies.destroy({ where: {}, force: true }),
      sequelize.models.stripe_customers.destroy({ where: {} }),
    ]);
    const { data } = await stripe.customers.list({
      limit: 100,
    });
    for (let customer of data) {
      await stripe.customers.del(customer.id);
    }
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    reset,
  },
};
