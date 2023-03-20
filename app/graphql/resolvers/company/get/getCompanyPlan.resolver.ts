import { company_plans } from "../../../../db/models/company_plans";
import sequelize from "../../../../postgres/dbconnection";
import { GetCompanyPlanInput } from "../../../resolvers-types.generated";

const getCompanyPlan = async (
  parent: any,
  { data }: { data: GetCompanyPlanInput },
  context: any
) => {
  const { companyId } = data;
  try {
    const companyPlan = (await sequelize.models.company_plans.findOne({
      where: {
        companyId,
      },
    })) as company_plans;

    if (!companyPlan) return null;

    return companyPlan.get({ plain: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getCompanyPlan,
  },
};
