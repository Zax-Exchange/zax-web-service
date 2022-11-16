import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectBidComponentInput } from "../../../resolvers-types.generated";

const updateProjectBidComponents = async (
  parent: any,
  { data }: { data: UpdateProjectBidComponentInput[] },
  context: any,
  info: any
) => {
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map((input) => {
          const { bidComponentId, quantityPrices, samplingFee, toolingFee } =
            input;

          return sequelize.models.project_bid_components.update(
            {
              quantityPrices,
              samplingFee,
              toolingFee,
            },
            { where: { id: bidComponentId }, transaction }
          );
        })
      );
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProjectBidComponents,
  },
};
