import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { CreateProjectComponentInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import cacheService from "../../../../redis/CacheService";

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
) => {
  const project_components = sequelize.models.project_components;
  const component_specs = sequelize.models.component_specs;
  try {
    for (let component of components) {
      const projectComponentId = uuidv4();
      await project_components.create(
        {
          id: projectComponentId,
          projectId,
          ...component,
        },
        { transaction }
      );
      await component_specs.create(
        {
          id: uuidv4(),
          projectComponentId,
          ...component.componentSpec,
        },
        { transaction }
      );
    }
    await cacheService.invalidateProjectInCache(projectId);
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default createProjectComponents;
