import { stripe } from "../../api/plan/createSubscriptionsApis";
import sequelize from "../../postgres/dbconnection"


const reset = async () => {
  try {
    await sequelize.models.companies.destroy({ where: {} })
    await sequelize.models.company_plans.destroy({ where: {} })
    await sequelize.models.stripe_customers.destroy({ where: {} });
    const { data } = await stripe.customers.list({
      limit: 100
    })
    for(let customer of data) {
      await stripe.customers.del(customer.id);
    }
    return true;
  } catch(e) {
    return Promise.reject(e)
  }
}

export {
  reset
}