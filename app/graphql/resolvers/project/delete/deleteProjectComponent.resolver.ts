import { UserInputError } from "apollo-server-core";
import {
  project_components
} from "../../../../models/project_components";
import { PROJECT_UPDATE_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import ProjectApiUtils from "../../../../utils/projectUtils";
import { DeleteProjectComponentInput } from "../../../resolvers-types.generated";

const getProjectComponent = (componentId: string) => {
  return sequelize.models.project_components.findByPk(componentId).then(value => value as project_components);
}

const deleteProjectComponent = async (
  parent: any,
  { data }: { data: DeleteProjectComponentInput },
  context: any,
  info: any
) => {
  try {
    let projectId: string | null = null;
    let projectComponent: project_components | null = null;
    await sequelize.transaction(async (transaction) => {
      const componentId = data.componentId;
      projectComponent = await getProjectComponent(componentId);
      projectId = projectComponent.projectId;

      if (projectComponent === null) {
        return Promise.reject(
          new UserInputError(
            `could not find project_component with id ${componentId}`
          )
        );
      }

      // delete project component
      await sequelize.models.project_components.destroy({
        where: { id: projectComponent.id },
        transaction,
        individualHooks: true,
      });
    });

    if (projectId != null) {
      await cacheService.invalidateProjectInCache(projectId);
      
      // send notification
      Promise.all([
        ProjectApiUtils.getProjectUsers(projectId),
        ProjectApiUtils.getProjectInstance(projectId),
      ]).then(([users, project]) => {
        if (!users.length || !project) return;
  
        NotificationService.sendNotification(PROJECT_UPDATE_ROUTE, {
          receivers: users.map((u) => u.userId),
          data: {
            message: `Component ${projectComponent?.name} is deleted from project: ${project?.name}`,
            projectId: project?.id,
          },
        });
      });
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deleteProjectComponent,
  },
};
