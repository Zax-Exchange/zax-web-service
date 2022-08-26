import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { CreateProjectComponentInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a list of project components associated with projectId
 * @param projectId
 * @param components
 * @param companyId
 * @param transaction
 * @returns boolean
 */
const createProjectComponents = async (
  projectId: string,
  components: CreateProjectComponentInput[],
  companyId: number,
  transaction: Transaction
): Promise<boolean> => {
  const project_components = sequelize.models.project_components;

  try {
    for (let component of components) {
      await project_components.create(
        {
          id: uuidv4(),
          projectId,
          ...component,
        },
        { transaction }
      );
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default createProjectComponents;
