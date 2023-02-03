import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import { projects, projectsAttributes } from "../../../../models/projects";
import { project_changelogs } from "../../../../models/project_changelogs";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { UpdateProjectDocumentWithProjectSpecInput } from "../../../../elastic/types/project";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  CreateProjectComponentInput,
  InvoiceStatus,
  PurchaseOrderStatus,
  QuantityPrice,
  UpdateGuestProjectInput,
  UpdateProjectBidComponentInput,
  UpdateProjectComponentData,
  UpdateProjectData,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";
import cacheService from "../../../../redis/CacheService";
import http from "http";
import NotificationService from "../../../../notification/NotificationService";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GUEST_PROJECT_UPDATE_ROUTE,
  PROJECT_UPDATE_ROUTE,
} from "../../../../notification/notificationRoutes";
import { Model, Transaction } from "sequelize/types";
import {
  project_bid_components,
  project_bid_componentsAttributes,
  project_bid_componentsCreationAttributes,
} from "../../../../models/project_bid_components";
import updateProjectComponents from "./updateProjectComponents";
import deleteProjectComponents from "../delete/deleteProjectComponent";
import { createProjectComponents } from "../create/createProject.resolver";
import {
  getPreviousAndNewComponents,
  getProjectDiffs,
} from "./updateProject.resolver";

const updateGuestProject = async (
  parent: any,
  { data }: { data: UpdateGuestProjectInput },
  context: any,
  info: any
) => {
  const {
    projectData,
    componentsForCreate,
    componentsForUpdate,
    componentsForDelete,
  } = data;

  try {
    const {
      projectId,
      name,
      category,
      totalWeight,
      deliveryAddress,
      deliveryDate,
      targetPrice,
      orderQuantities,
    } = projectData;

    const projectChangeId = uuidv4();
    const originalModel = (await sequelize.models.projects.findByPk(
      projectId
    )) as projects;

    const componentChanges = getPreviousAndNewComponents(
      componentsForCreate,
      componentsForUpdate,
      componentsForDelete
    );

    await sequelize.transaction(async (transaction) => {
      const updates: Promise<any>[] = [
        sequelize.models.projects.update(
          {
            name,
            category,
            totalWeight,
            deliveryAddress,
            deliveryDate,
            targetPrice,
            orderQuantities,
          },
          {
            where: {
              id: projectId,
            },
            transaction,
          }
        ),
        createProjectComponents(projectId, componentsForCreate, transaction),
        updateProjectComponents(componentsForUpdate, transaction),
        deleteProjectComponents(
          componentsForDelete.map((comp) => comp.componentId),
          transaction
        ),
        ...getProjectDiffs(originalModel, projectData, projectChangeId).map(
          (change) =>
            sequelize.models.project_changelog.create(
              { ...change },
              { transaction }
            )
        ),
        sequelize.models.project_changelog.create(
          {
            projectId,
            id: projectChangeId,
            propertyName: "components",
            oldValue: componentChanges.oldComps,
            newValue: componentChanges.newComps,
          },
          { transaction }
        ),
      ];

      await Promise.all(updates);
    });

    await cacheService.invalidateProjectInCache(projectId);

    // notify all permissioned users (guest project is owned by vendors) on the project async
    ProjectApiUtils.getProjectUsers(projectId).then((users) => {
      for (let user of users) {
        NotificationService.sendNotification(GUEST_PROJECT_UPDATE_ROUTE, {
          receivers: users.map((u) => u.userId),
          data: {
            message: `app.notification.guestProject.update`,
            projectName: name,
            projectId,
          },
        });
      }
    });

    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateGuestProject,
  },
};
