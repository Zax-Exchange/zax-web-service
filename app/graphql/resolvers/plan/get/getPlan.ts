import sequelize from "../../../../postgres/dbconnection";
import { GetPlanInput, Plan } from "../../../resolvers-types.generated";

/** Gets a specific plan based on planId */
const getPlan = async (
  parent: any,
  { data }: { data: GetPlanInput },
  context: any
) => {
  const plans = sequelize.models.plans;
  const { planId } = data;
  try {
    return await plans
      .findByPk(planId)
      .then((p) => p?.get({ plain: true }) as Plan);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getPlan,
  },
};
