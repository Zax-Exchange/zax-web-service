import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums";
import { Op, Transaction } from "sequelize";
import ProjectUtils from "./utils";

const deleteProject = async(data: projectTypes.DeleteProjectInput): Promise<boolean | Error> => {
  const projects = sequelize.models.projects;
  const project_permissions = sequelize.models.project_permissions;

  const { userId, projectId } = data;
  
  const userAllowed = await ProjectUtils.checkProjectEditableByUser(project_permissions, userId, projectId);

  if (!userAllowed) {
    return Promise.reject(new Error("Permission denied"))
  }
  try {
    await projects.destroy({
      where: {
        id: projectId,
        status: enums.ProjectStatus.OPEN
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectComponents = async(data: projectTypes.DeleteProjectComponentsInput): Promise<boolean | Error> => {
  const project_components = sequelize.models.project_components;
  const project_permissions = sequelize.models.project_permissions;

  const { projectComponentIds, projectId, userId } = data;

  const userAllowed = await ProjectUtils.checkProjectEditableByUser(project_permissions, userId, projectId);

  if (!userAllowed) {
    return Promise.reject(new Error("Permission denied"))
  }

  try {
    await sequelize.transaction(async (transaction: Transaction) => {
      for (let id of projectComponentIds) {
        await project_components.destroy({
          where: {
            id
          },
          transaction
        });
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectBid = async(data: projectTypes.DeleteProjectBidInput): Promise<boolean | Error> => {
  const project_bids = sequelize.models.project_bids;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  const { userId, projectBidId } = data;
  
  const userAllowed = await ProjectUtils.checkProjectEditableByUser(project_bid_permissions, userId, projectBidId);

  if (!userAllowed) {
    return Promise.reject(new Error("Permission denied"))
  }
  try {
    await project_bids.destroy({
      where: {
        id: projectBidId
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectComponentsBid = async(data: projectTypes.DeleteProjectComponentsBidInput): Promise<boolean | Error> => {
  const project_components = sequelize.models.project_components;
  const project_permissions = sequelize.models.project_permissions;

  const { projectComponentBidIds, projectBidId, userId } = data;

  const userAllowed = await ProjectUtils.checkProjectBidEditableByUser(project_permissions, userId, projectBidId);

  if (!userAllowed) {
    return Promise.reject(new Error("Permission denied"))
  }

  try {
    await sequelize.transaction(async (transaction: Transaction) => {
      for (let id of projectComponentBidIds) {
        await project_components.destroy({
          where: {
            id
          },
          transaction
        });
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectPermissions = async (data: projectTypes.DeleteProjectPermissionsInput): Promise<boolean | Error> => {
  const { userIds, projectId } = data;
  const project_permissions = sequelize.models.project_permissions;
  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_permissions.destroy({
          where: {
            userId,
            projectId
          }
        });
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectBidPermissions = async (data: projectTypes.DeleteProjectBidPermissionsInput): Promise<boolean | Error> => {
  const { userIds, projectBidId } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_bid_permissions.destroy({
          where: {
            userId,
            projectBidId
          }
        });
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export {
  deleteProject,
  deleteProjectComponents,
  deleteProjectBid,
  deleteProjectComponentsBid,
  deleteProjectPermissions,
  deleteProjectBidPermissions
}