import { UserInputError } from "apollo-server-core";
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
  parent: any,
  { data }: { data: DeleteProjectComponentInput[] },
  context: any,
  info: any
) => {
  try {
    let projectId: string | null = null;
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map(async (comp) => {
          const componentId = comp.componentId;
          const projectComponent = await getProjectComponent(componentId);

          if (projectComponent === null) {
            return Promise.reject(
              new UserInputError(
                `could not find project_component with id ${componentId}`
              )
            );
          }

          projectId = projectComponent.projectId;

          // delete project component
          return sequelize.models.project_components.destroy({
            where: { id: componentId },
            transaction,
            individualHooks: true,
          });
        })
      );
    });

    if (projectId != null) {
      await cacheService.invalidateProjectInCache(projectId);
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deleteProjectComponents,
  },
};
