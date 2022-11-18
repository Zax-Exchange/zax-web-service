import { UserInputError } from "apollo-server-core";
import { Transaction } from "sequelize/types";
import { project_components } from "../../../../models/project_components";
import { PROJECT_UPDATE_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import ProjectApiUtils from "../../../../utils/projectUtils";
import { DeleteProjectComponentInput } from "../../../resolvers-types.generated";

const getProjectComponent = (componentId: string) => {
  return sequelize.models.project_components
    .findByPk(componentId)
    .then((value) => value as project_components);
};

const deleteProjectComponents = async (
  componentIds: string[],
  transaction: Transaction
) => {
  try {
    let projectId: string | null = null;
    await Promise.all(
      componentIds.map(async (id) => {
        const projectComponent = await getProjectComponent(id);

        if (projectComponent === null) {
          return Promise.reject(
            new UserInputError(`could not find project_component with id ${id}`)
          );
        }

        projectId = projectComponent.projectId;

        // delete project component
        return sequelize.models.project_components.destroy({
          where: { id },
          transaction,
          individualHooks: true,
        });
      })
    );

    if (projectId != null) {
      await cacheService.invalidateProjectInCache(projectId);
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default deleteProjectComponents;
