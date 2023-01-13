import sequelize from "../../../../postgres/dbconnection";
import {
  QuantityPriceInput,
  UpdateProjectBidComponentInput,
} from "../../../resolvers-types.generated";

const isEmptyQuantityPrices = (quantityPrices: QuantityPriceInput[]) => {
  if (quantityPrices.some((qp) => !qp.price)) return true;
  return false;
};

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

          // if everything is empty, then we assume vendor wants to delete the bid
          if (
            isEmptyQuantityPrices(quantityPrices) &&
            !samplingFee &&
            !toolingFee
          ) {
            return sequelize.models.project_bid_components.destroy({
              where: {
                id: bidComponentId,
              },
              transaction,
            });
          }
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
