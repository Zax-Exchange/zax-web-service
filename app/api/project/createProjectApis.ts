import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/create/projectTypes";
import * as enums from "../../types/common/enums";
import { Transaction } from "sequelize/types";
import ProjectApiUtils from "./utils";
import UserApiUtils from "../user/utils";

//TODO: add other user permissions when creating project?
const createProject = async(data: projectTypes.CreateProjectInput): Promise<boolean> => {
  const projects = sequelize.models.projects;
  const users = sequelize.models.users;

  const {userId, name, deliveryDate, deliveryLocation, budget, design, components} = data;
  try {
    const isVendor = await UserApiUtils.isVendorWithUserId(userId);
    if (isVendor) {
      return Promise.reject(new Error("Action not allowed."));
    }
    await sequelize.transaction(async transaction => {
      const user = await users.findOne({
        where: {
          id: userId
        },
        transaction
      });
      const project = await projects.create({
        userId,
        name,
        deliveryDate,
        deliveryLocation,
        budget,
        design,
        companyId: user?.getDataValue("companyId"),
        status: enums.ProjectStatus.OPEN
      }, { transaction });
      const projectId = project.getDataValue("id");
      await createProjectComponents(projectId, components, transaction);
      await createOrUpdateProjectPermission({ userId, projectId, permission: enums.ProjectPermission.OWNER }, transaction);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectComponents = async(projectId: number, components: projectTypes.CreateProjectComponentInput[], transaction: Transaction): Promise<boolean> => {
  const project_components = sequelize.models.project_components;
  
  try {
    for (let component of components) {
      await project_components.create({
        projectId,
        ...component
      }, {transaction})
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const createProjectBid = async(data: projectTypes.CreateProjectBidInput): Promise<boolean> => {
  const project_bids = sequelize.models.project_bids;
  const { userId, projectId, comments, components } = data;

  const isVendor = await UserApiUtils.isVendorWithUserId(userId);
  if (!isVendor) {
    return Promise.reject(new Error("Action not allowed."));
  }

  try {
    await sequelize.transaction(async transaction => {
      const bid = await project_bids.create({
        userId,
        projectId,
        comments
      }, { transaction });
      const projectBidId = bid.getDataValue("id");
      await createProjectComponentsBid(projectBidId, components, transaction);
      await createOrUpdateProjectBidPermission({ userId, projectBidId, permission: enums.ProjectPermission.OWNER }, transaction);
      await ProjectApiUtils.updateProjectStatus(projectId, enums.ProjectStatus.IN_PROGRESS);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectComponentsBid = async(projectBidId: number, components: projectTypes.CreateProjectComponentBidInput[], transaction: Transaction): Promise<boolean> => {
  const project_component_bids = sequelize.models.project_component_bids;
  try {
    for (let component of components) {
      for (let componentBidQuantityPrice of component.componentBidQuantityPrices) {
        const { projectComponentId, quantityPrices } = componentBidQuantityPrice;
        await project_component_bids.create({
          projectBidId,
          projectComponentId,
          quantityPrices
        }, {transaction}) 
      }
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createOrUpdateProjectPermission = async(data: projectTypes.CreateOrUpdateProjectPermissionInput, transaction?: Transaction): Promise<boolean> => {
  const { userId, projectId, permission } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    const foundPermission = await ProjectApiUtils.getProjectOrBidPermission(project_permissions, "projectId", userId, projectId, transaction);
    
    if (!foundPermission) {
      await ProjectApiUtils.createPermission(project_permissions, "projectId", userId, projectId, permission, transaction);
    } else {
      await ProjectApiUtils.updatePermission(project_permissions, "projectId", userId, projectId, permission, transaction);
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

const createOrUpdateProjectBidPermission = async(data: projectTypes.CreateOrUpdateProjectBidPermissionInput, transaction?: Transaction): Promise<boolean> => {
  const { userId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    const foundPermission = await ProjectApiUtils.getProjectOrBidPermission(project_bid_permissions, "projectBidId", userId, projectBidId);
    if (!foundPermission) {
      await ProjectApiUtils.createPermission(project_bid_permissions, "projectBidId", userId, projectBidId, permission, transaction);
    } else {
      await ProjectApiUtils.updatePermission(project_bid_permissions, "projectBidId", userId, projectBidId, permission, transaction);
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }

};

export {
  createProject,
  createProjectBid,
  createOrUpdateProjectPermission,
  createOrUpdateProjectBidPermission
}