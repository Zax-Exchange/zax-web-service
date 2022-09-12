import sequelize from "../../../../postgres/dbconnection";
import { GetAllPlansInput } from "../../../resolvers-types.generated";

const getAllPlans = async (
  parent: any,
  { data }: { data: GetAllPlansInput },
  context: any
) => {
  const plans = sequelize.models.plans;
  const { isVendor } = data;
  try {
    return await plans
      .findAll({
        where: {
          isVendor,
        },
      })
      .then((ps) => ps.map((p) => p.get({ plain: true })));
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getAllPlans,
  },
};
