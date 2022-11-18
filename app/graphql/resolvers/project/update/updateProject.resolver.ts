import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import { projects, projectsAttributes } from "../../../../models/projects";
import { project_changelogs } from "../../../../models/project_changelogs";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { updateProjectDocumentWithProjectSpecInput } from "../../../../elastic/types/project";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  QuantityPrice,
  UpdateProjectBidComponentInput,
  UpdateProjectData,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";
import cacheService from "../../../../redis/CacheService";
import http from "http";
import NotificationService from "../../../../notification/NotificationService";
import ProjectApiUtils from "../../../../utils/projectUtils";
import { PROJECT_UPDATE_ROUTE } from "../../../../notification/notificationRoutes";
import { Model, Transaction } from "sequelize/types";
import {
  project_bid_components,
  project_bid_componentsAttributes,
  project_bid_componentsCreationAttributes,
} from "../../../../models/project_bid_components";
import updateProjectComponents from "./updateProjectComponents";
import deleteProjectComponents from "../delete/deleteProjectComponent.resolver";

const updateProjectBidComponentsQuantities = async (
  bidsComponents: Model<
    project_bid_componentsAttributes,
    project_bid_componentsCreationAttributes
  >[][],
  newQuantities: Set<number>,
  transaction: Transaction
) => {
  for (let bidComponents of bidsComponents) {
    for (let bidComponent of bidComponents) {
      const oldQp = bidComponent.get("quantityPrices", {
        plain: true,
      }) as QuantityPrice[];
      const newQp: QuantityPrice[] = [];
      for (let qp of oldQp) {
        if (newQuantities.has(qp.quantity)) {
          newQp.push(qp);
        }
      }

      await bidComponent.update(
        {
          quantityPrices: newQp,
        },
        { transaction }
      );
    }
  }
};

const getProjectDiffs = (
  originalEntity: projects,
  projectUpdateData: UpdateProjectData
) => {
  const output: project_changelogs[] = [];
  const changeId = uuidv4();
  Object.entries(projectUpdateData)
    .filter(([k, v]) => k !== "projectId") // projectId is not changeable but is in UpdateProjectInput
    .forEach(([key, value]) => {
      const originalValue = originalEntity.getDataValue(
        key as keyof projectsAttributes
      );

      // perform a deep comparison
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        output.push({
          projectId: originalEntity.id,
          id: changeId,
          propertyName: key,
          oldValue: originalValue,
          newValue: value,
        } as project_changelogs);
      }
    });
  return output;
};

const updateProject = async (
  parent: any,
  { data }: { data: UpdateProjectInput },
  context: any,
  info: any
) => {
  const { projectData, componentsData, componentIdsToDelete } = data;

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

    await sequelize.transaction(async (transaction) => {
      const originalModel: projects = (await sequelize.models.projects.findByPk(
        projectId
      )) as projects;

      if (originalModel === null) {
        return Promise.reject(
          new UserInputError(`could not find project with id ${projectId}`)
        );
      }

      const bids = await originalModel.getProject_bids();

      const allBidComponents = await Promise.all(
        bids.map((bid) => {
          return sequelize.models.project_bid_components.findAll({
            where: {
              projectBidId: bid.id,
            },
          });
        })
      );

      const changes: project_changelogs[] = getProjectDiffs(
        originalModel,
        data.projectData
      );

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
        sequelize.models.project_bids.update(
          {
            status: BidStatus.Outdated,
          },
          {
            where: {
              projectId,
            },
            transaction,
          }
        ),
        updateProjectBidComponentsQuantities(
          allBidComponents,
          new Set(orderQuantities),
          transaction
        ),
        updateProjectComponents(componentsData, transaction),
        deleteProjectComponents(componentIdsToDelete, transaction),
      ];

      changes.forEach((change: project_changelogs) => {
        updates.push(
          sequelize.models.project_changelog.create(
            { ...change },
            { transaction }
          )
        );
      });

      await Promise.all(updates);
    });
    ElasticProjectService.updateProjectDocumentWithProjectSpec(
      data.projectData as updateProjectDocumentWithProjectSpecInput
    );

    await cacheService.invalidateProjectInCache(projectId);

    // notify all vendors on the project async
    ProjectApiUtils.getProjectBidsByProjectId(projectId)
      .then((bids) => {
        return Promise.all(
          bids.map((bid) => {
            return ProjectApiUtils.getProjectBidUsers(bid.id);
          })
        );
      })
      .then((bidsUsers) => {
        for (let bidUsers of bidsUsers) {
          NotificationService.sendNotification(PROJECT_UPDATE_ROUTE, {
            receivers: bidUsers.map((u) => u.userId),
            data: {
              message: `There is an update on ${name}`,
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
    updateProject,
  },
};
