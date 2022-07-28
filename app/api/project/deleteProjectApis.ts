import sequelize from "../../postgres/dbconnection";
import * as projectTypes from "../types/delete/projectTypes";
import * as enums from "../types/common/enums";
import { Op, Transaction } from "sequelize";
import ProjectUtils from "../utils/projectUtils";
import ElasticProjectService from "../../elastic/project/ElasticProjectService";


const deleteProject = async(id: number): Promise<boolean> => {
  const projects = sequelize.models.projects;

  try {
    await projects.destroy({
      where: {
        id
      },
      individualHooks: true
    });
    ElasticProjectService.deleteProjectDocument(id);
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectComponents = async(data: projectTypes.DeleteProjectComponentsInput): Promise<boolean> => {
  const project_components = sequelize.models.project_components;

  const { projectComponentIds, projectId, userId } = data;

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

// TODO: should be withdraw bid? add a status to project bid?
const deleteProjectBid = async(data: projectTypes.DeleteProjectBidInput): Promise<boolean> => {
  const project_bids = sequelize.models.project_bids;

  const { userId, projectBidId } = data;

  try {
    await project_bids.destroy({
      where: {
        id: projectBidId
      },
      individualHooks: true
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteProjectBidComponents = async(data: projectTypes.DeleteProjectBidComponentsInput): Promise<boolean> => {
  const project_components = sequelize.models.project_components;

  const { projectBidComponentIds, projectBidId, userId } = data;

  try {
    await sequelize.transaction(async (transaction: Transaction) => {
      for (let id of projectBidComponentIds) {
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

const deleteProjectPermissions = async (data: projectTypes.DeleteProjectPermissionsInput): Promise<boolean> => {
  const { userIds, projectId } = data;
  const project_permissions = sequelize.models.project_permissions;
  //TODO: should also check if user performing action is allowed
  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_permissions.destroy({
          where: {
            userId,
            projectId
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

const deleteProjectBidPermissions = async (data: projectTypes.DeleteProjectBidPermissionsInput): Promise<boolean> => {
  const { userIds, projectBidId } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_bid_permissions.destroy({
          where: {
            userId,
            projectBidId
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

export {
  deleteProject,
  deleteProjectComponents,
  deleteProjectBid,
  deleteProjectBidComponents,
  deleteProjectPermissions,
  deleteProjectBidPermissions
}