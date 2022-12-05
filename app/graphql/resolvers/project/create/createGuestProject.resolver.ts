import sequelize from "../../../../postgres/dbconnection";
import {
  CreateGuestProjectInput,
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProjectPermission,
  ProjectStatus,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import createOrUpdateProjectPermission from "./createOrUpdateProjectPermission";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { Transaction } from "sequelize/types";
import cacheService from "../../../../redis/CacheService";
import { component_specs } from "../../../../models/component_specs";
import { createProjectComponents } from "./createProject.resolver";
import { projects } from "../../../../models/projects";
import NotificationService from "../../../../notification/NotificationService";
import { GUEST_PROJECT_CREATE_ROUTE } from "../../../../notification/notificationRoutes";
import ProjectApiUtils from "../../../../utils/projectUtils";

const createGuestProject = async (
  parent: any,
  { data }: { data: CreateGuestProjectInput },
  context: any,
  info: any
) => {
  const projects = sequelize.models.projects;

  const {
    projectId,
    creationMode,
    name,
    category,
    totalWeight,
    deliveryDate,
    deliveryAddress,
    targetPrice,
    orderQuantities,
    components,
  } = data;
  try {
    const products: string[] = [];

    await sequelize.transaction(async (transaction) => {
      await projects.update(
        {
          id: projectId,
          creationMode,
          name,
          deliveryDate,
          deliveryAddress,
          category,
          totalWeight,
          targetPrice,
          orderQuantities,
          status: ProjectStatus.Open,
        },

        {
          where: {
            id: projectId,
          },
          transaction,
        }
      );

      for (let comp of components) {
        products.push(comp.componentSpec.productName);
      }

      await createProjectComponents(projectId, components, transaction);
    });

    NotificationService.sendNotification(GUEST_PROJECT_CREATE_ROUTE, {
      receivers: (await ProjectApiUtils.getProjectUsers(projectId)).map(
        (user) => user.userId
      ),
      data: {
        message: "Guest project created.",
        projectId,
      },
    });

    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createGuestProject,
  },
};
