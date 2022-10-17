import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { CreateProjectBidComponentInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a lit of bid components associated with projectBidId
 * @param projectBidId
 * @param components
 * @param transaction
 * @returns boolean
 */
const createProjectBidComponents = async (
  projectBidId: string,
  components: CreateProjectBidComponentInput[],
  transaction: Transaction
): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;
  try {
    for (let component of components) {
      const { projectComponentId, quantityPrices, samplingFee, toolingFee } =
        component;
      await project_bid_components.create(
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
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default createProjectBidComponents;
