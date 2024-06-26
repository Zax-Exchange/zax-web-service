import { UserInputError } from "apollo-server-core";
import { v4 as uuidv4 } from "uuid";
import { projects, projectsAttributes } from "../../../../db/models/projects";
import { project_changelogs } from "../../../../db/models/project_changelogs";
import ElasticProjectService from "../../../../elastic/project/ElasticProjectService";
import { UpdateProjectDocumentWithProjectSpecInput } from "../../../../elastic/types/project";
import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  CreateProjectComponentInput,
  DeleteProjectComponentInput,
  InvoiceStatus,
  ProjectVisibility,
  PurchaseOrderStatus,
  QuantityPrice,
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
  PROJECT_UPDATE_ROUTE,
  USER_RELOAD_ROUTE,
} from "../../../../notification/notificationRoutes";
import { Model, Transaction } from "sequelize/types";
import {
  project_bid_components,
  project_bid_componentsAttributes,
  project_bid_componentsCreationAttributes,
} from "../../../../db/models/project_bid_components";
import updateProjectComponents from "./updateProjectComponents";
import deleteProjectComponents from "../delete/deleteProjectComponent";
import { createProjectComponents } from "../create/createProject.resolver";

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

export const getProjectDiffs = (
  originalEntity: projects,
  projectUpdateData: UpdateProjectData,
  changeId: string
) => {
  const output: project_changelogs[] = [];

  Object.entries(projectUpdateData)
    .filter(([k, v]) => {
      /**
       * NOTE: please make sure only the keys that are same between UpdateProjectData and projectsAttributes pass through,
       * otherwise when we use the key on UpdateProjectData below to access originalModel's attribute it will be null
       * and diff will get recorded
       */
      if (k === "visibility") {
        // visibility change should not be recorded as a diff
        return false;
      }
      if (k === "projectId") {
        // though projectId will be same, but db model does not have projectId field on it so we need to filter it out
        return false;
      }
      return true;
    })
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

const getProjectComponentProducts = (
  compsForUpdate: UpdateProjectComponentData[],
  compsForCreate: CreateProjectComponentInput[]
) => {
  const products = new Set<string>();
  compsForUpdate.forEach((comp) =>
    products.add(comp.componentSpec.productName)
  );
  compsForCreate.forEach((comp) =>
    products.add(comp.componentSpec.productName)
  );
  return Array.from(products);
};

export const getPreviousAndNewComponents = (
  compsForCreate: CreateProjectComponentInput[],
  compsForUpdate: UpdateProjectComponentData[],
  compsForDelete: DeleteProjectComponentInput[]
) => {
  const oldComps: { id: string; name: string }[] = [];
  const newComps: { id: string | null; name: string }[] = [];
  compsForUpdate.forEach((comp) => {
    oldComps.push({ id: comp.componentId, name: comp.name });
    newComps.push({ id: comp.componentId, name: comp.name });
  });
  compsForDelete.forEach((comp) =>
    oldComps.push({ id: comp.componentId, name: comp.componentName })
  );
  compsForCreate.forEach((comp) =>
    newComps.push({ id: null, name: comp.name })
  );
  return {
    oldComps,
    newComps,
  };
};

export const hasNewOrDeletedComponents = (
  compsForCreate: CreateProjectComponentInput[],
  compsForDelete: DeleteProjectComponentInput[]
) => {
  if (compsForCreate.length || compsForDelete.length) return true;
  return false;
};

const updateProject = async (
  parent: any,
  { data }: { data: UpdateProjectInput },
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
      country,
      deliveryDate,
      targetPrice,
      orderQuantities,
      visibility,
    } = projectData;

    const originalModel = (await sequelize.models.projects.findByPk(
      projectId
    )) as projects;
    const originalProject = originalModel.get({ plain: true });

    const componentChanges = getPreviousAndNewComponents(
      componentsForCreate,
      componentsForUpdate,
      componentsForDelete
    );

    const changeId = uuidv4();

    await sequelize.transaction(async (transaction) => {
      if (originalModel === null) {
        return Promise.reject(
          new UserInputError(`could not find project with id ${projectId}`)
        );
      }

      const [bids, pos, invoices] = await Promise.all([
        originalModel.getProject_bids(),
        originalModel.getPurchase_orders(),
        originalModel.getInvoices(),
      ]);
      originalModel.getBid_remarks();
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
        data.projectData,
        changeId
      );

      const updates: Promise<any>[] = [
        sequelize.models.projects.update(
          {
            name,
            category,
            totalWeight,
            deliveryAddress,
            country,
            deliveryDate,
            targetPrice,
            orderQuantities,
            visibility,
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
        ...pos.map((po) =>
          po.update({
            status: PurchaseOrderStatus.Outdated,
          })
        ),
        ...invoices.map((invoice) =>
          invoice.update({
            status: InvoiceStatus.Outdated,
          })
        ),
        createProjectComponents(projectId, componentsForCreate, transaction),
        updateProjectBidComponentsQuantities(
          allBidComponents,
          new Set(orderQuantities),
          transaction
        ),
        updateProjectComponents(componentsForUpdate, transaction),
        deleteProjectComponents(
          componentsForDelete.map((comp) => comp.componentId),
          transaction
        ),
      ];

      if (hasNewOrDeletedComponents(componentsForCreate, componentsForDelete)) {
        updates.push(
          sequelize.models.project_changelog.create(
            {
              projectId,
              id: changeId,
              propertyName: "components",
              oldValue: componentChanges.oldComps,
              newValue: componentChanges.newComps,
            },
            { transaction }
          )
        );
      }

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

    if (originalProject.visibility === ProjectVisibility.Public) {
      if (visibility === ProjectVisibility.Private) {
        ElasticProjectService.deleteProjectDocument(projectId);
      } else {
        ElasticProjectService.updateProjectDocumentWithProjectSpec(
          data.projectData as UpdateProjectDocumentWithProjectSpecInput
        );

        ElasticProjectService.updateProjectDocumentProducts({
          projectId,
          products: getProjectComponentProducts(
            componentsForUpdate,
            componentsForCreate
          ),
        });
      }
    } else {
      if (visibility === ProjectVisibility.Public) {
        ElasticProjectService.createProjectDocument({
          userId: originalProject.userId,
          projectId,
          category,
          deliveryDate,
          deliveryAddress,
          country,
          targetPrice,
          orderQuantities,
          products: getProjectComponentProducts(
            componentsForUpdate,
            componentsForCreate
          ),
        });
      }
    }

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
              message: `app.notification.project.update`,
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
    updateProject,
  },
};
