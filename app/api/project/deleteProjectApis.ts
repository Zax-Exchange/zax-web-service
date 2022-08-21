import sequelize from "../../postgres/dbconnection";
import * as projectTypes from "../types/delete/projectTypes";
import * as enums from "../types/common/enums";
import { Op, Transaction } from "sequelize";
import ProjectUtils from "../utils/projectUtils";
import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import { DeleteProjectBidPermissionsInput, DeleteProjectPermissionsInput } from "../../graphql/resolvers-types";


const deleteProject = async(id: string) => {
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

// TODO: finish gql implementation
const deleteProjectComponents = async(componentIds: string[]) => {
  const project_components = sequelize.models.project_components;

  try {
    await sequelize.transaction(async (transaction: Transaction) => {
      for (let id of componentIds) {
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

// TODO: should we withdraw bid? add a status to project bid?
const deleteProjectBid = async(projectBidId: string) => {
  const project_bids = sequelize.models.project_bids;

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

// TODO: not sure if we need this
const deleteProjectBidComponents = async(componentIds: string[]): Promise<boolean> => {
  const project_components = sequelize.models.project_components;


  try {
    await sequelize.transaction(async (transaction: Transaction) => {
      for (let id of componentIds) {
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

const deleteProjectPermissions = async (data: DeleteProjectPermissionsInput): Promise<boolean> => {
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

const deleteProjectBidPermissions = async (data: DeleteProjectBidPermissionsInput): Promise<boolean> => {
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