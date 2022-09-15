import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectInput } from "../../../resolvers-types.generated";

// TODO: broadcast update project even to vendors
const updateProject = async (
  parent: any,
  { data }: { data: UpdateProjectInput },
  context: any,
  info: any
) => {
  const {
    id,
    name,
    deliveryAddress,
    deliveryDate,
    targetPrice,
    orderQuantities,
    components,
  } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      await sequelize.models.projects.update(
        {
          name,
          deliveryAddress,
          deliveryDate,
          targetPrice,
          orderQuantities,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );
    });
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProject,
  },
};
