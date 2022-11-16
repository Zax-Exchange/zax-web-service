import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { CreateProjectBidComponentInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 *  Creates a lit of bid components associated with projectBidId
 * @param data
 * @returns
 */
const createProjectBidComponents = async (
  parent: any,
  { data }: { data: CreateProjectBidComponentInput[] },
  context: any,
  info: any
): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map((comp) => {
          const {
            projectBidId,
            projectComponentId,
            quantityPrices,
            samplingFee,
            toolingFee,
          } = comp;
          return project_bid_components.create(
            {
              id: uuidv4(),
              projectBidId,
              projectComponentId,
              quantityPrices,
              samplingFee,
              toolingFee,
            },
            { transaction }
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
    createProjectBidComponents,
  },
};
