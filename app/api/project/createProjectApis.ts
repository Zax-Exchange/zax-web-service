import sequelize from "../../postgres/dbconnection";
import { Transaction } from "sequelize/types";
import ProjectApiUtils from "../utils/projectUtils";

import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import { v4 as uuidv4 } from "uuid";
import notificationService from "../../stream/StreamService";
import {
  CreateProjectBidComponentInput,
  CreateProjectBidInput,
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectPermission,
  ProjectStatus,
  UpdateProjectBidPermissionsInputData,
  UpdateProjectPermissionsInputData,
} from "../../graphql/resolvers-types.generated";
//TODO: findOrCreate product or materials when creating project
const createProject = async (data: CreateProjectInput): Promise<boolean> => {
  const projects = sequelize.models.projects;
  const users = sequelize.models.users;
  const {
    userId,
    name,
    designId,
    deliveryDate,
    deliveryAddress,
    budget,
    components,
  } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      const user = await users.findOne({
        where: {
          id: userId,
        },
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const project = await projects.create(
        {
          id: uuidv4(),
          userId,
          name,
          deliveryDate,
          deliveryAddress,
          budget,
          companyId,
          status: ProjectStatus.Open,
        },
        { transaction }
      );
      const projectId = project.getDataValue("id");

      if (designId) {
        const design = await sequelize.models.project_designs.findByPk(
          designId
        );

        await design?.update(
          {
            projectId,
          },
          { transaction }
        );
      }
      const materials = [];
      for (let comp of components) {
        for (let mat of comp.materials) {
          materials.push(mat);
        }
      }
      await createProjectComponents(
        projectId,
        components,
        companyId,
        transaction
      );
      await createOrUpdateProjectPermission(
        { userIds: [userId], projectId, permission: ProjectPermission.Owner },
        transaction
      );
      ElasticProjectService.createProjectDocument({
        userId,
        projectId,
        deliveryDate,
        deliveryAddress,
        budget,
        materials,
      });
    });

    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectDesign = async (id: string, fileName: string) => {
  try {
    await sequelize.models.project_designs.create({
      id,
      fileName,
    });
    return id;
  } catch (error) {
    return Promise.reject(error);
  }
};

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

const createProjectBid = async (
  data: CreateProjectBidInput
): Promise<boolean> => {
  const project_bids = sequelize.models.project_bids;
  const { userId, projectId, comments, components } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      const user = await sequelize.models.users.findByPk(userId, {
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const bid = await project_bids.create(
        {
          id: uuidv4(),
          userId,
          companyId,
          projectId,
          comments,
        },
        { transaction }
      );
      const projectBidId = bid.getDataValue("id");
      await createProjectBidComponents(projectBidId, components, transaction);
      await createOrUpdateProjectBidPermission(
        {
          userIds: [userId],
          projectId,
          projectBidId,
          permission: ProjectPermission.Owner,
        },
        transaction
      );
      await ProjectApiUtils.updateProjectStatus(
        projectId,
        ProjectStatus.InProgress
      );
    });
    notificationService.broadcastNewBid(data);
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectBidComponents = async (
  projectBidId: string,
  components: CreateProjectBidComponentInput[],
  transaction: Transaction
): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;
  try {
    for (let component of components) {
      const { projectComponentId, quantityPrices } = component;
      await project_bid_components.create(
        {
          id: uuidv4(),
          projectBidId,
          projectComponentId,
          quantityPrices,
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

const createOrUpdateProjectPermission = async (
  data: UpdateProjectPermissionsInputData,
  transaction?: Transaction
): Promise<boolean> => {
  const { userIds, projectId, permission } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    for (let userId of userIds) {
      await project_permissions
        .findOrCreate({
          where: {
            userId,
            projectId,
          },
          defaults: {
            id: uuidv4(),
            permission,
          },
          transaction,
        })
        .then(async ([foundPermission, created]) => {
          if (!created) {
            await foundPermission.update(
              { permission: permission },
              { transaction }
            );
          }
        });
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createOrUpdateProjectBidPermission = async (
  data: UpdateProjectBidPermissionsInputData,
  transaction?: Transaction
): Promise<boolean> => {
  const { userIds, projectId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    for (let userId of userIds) {
      await project_bid_permissions
        .findOrCreate({
          where: {
            userId,
            projectId,
            projectBidId,
          },
          defaults: {
            id: uuidv4(),
            permission,
          },
          transaction,
        })
        .then(async ([foundPermission, created]) => {
          if (!created) {
            await foundPermission.update(
              { permission: permission },
              { transaction }
            );
          }
        });
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export {
  createProject,
  createProjectDesign,
  createProjectBid,
  createOrUpdateProjectPermission,
  createOrUpdateProjectBidPermission,
};
