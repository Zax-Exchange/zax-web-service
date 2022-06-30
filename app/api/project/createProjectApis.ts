import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums";
import { Transaction } from "sequelize/types";
import { updateProjectStatus } from "./updateProjectApis";

const createProject = async(data: projectTypes.CreateProjectInput): Promise<boolean | Error> => {
  const projects = sequelize.models.projects;
  const users = sequelize.models.users;

  const {userId, name, deliveryDate, deliveryLocation, budget, design, components} = data;
  try {
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
        status: enums.ProjectStatus.ACTIVE
      }, { transaction });
      const projectId = project.getDataValue("id");
      await createProjectComponent(projectId, components, transaction);
      await createOrUpdateProjectPermission({ userId, projectId, permission: enums.ProjectPermission.OWNER }, transaction);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectComponent = async(projectId: number, components: projectTypes.CreateProjectComponentInput[], transaction: Transaction): Promise<boolean | Error> => {
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

const createProjectBid = async(data: projectTypes.CreateProjectBidInput): Promise<boolean | Error> => {
  const project_bids = sequelize.models.project_bids;
  const { userId, projectId, comments, components } = data;
  try {
    await sequelize.transaction(async transaction => {
      const bid = await project_bids.create({
        userId,
        projectId,
        comments
      }, { transaction });
      const projectBidId = bid.getDataValue("id");
      await createProjectComponentBid(projectBidId, components, transaction);
      await createOrUpdateProjectBidPermission({ userId, projectBidId, permission: enums.ProjectPermission.OWNER }, transaction);
      await updateProjectStatus(projectId, enums.ProjectStatus.IN_PROGRESS);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectComponentBid = async(projectBidId: number, components: projectTypes.CreateProjectComponentBidInput[], transaction: Transaction): Promise<boolean | Error> => {
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

const createOrUpdateProjectPermission = async(data: projectTypes.CreateOrUpdateProjectPermissionInput, transaction?: Transaction): Promise<boolean | Error> => {
  const { userId, projectId, permission } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    const foundPermission = await project_permissions.findOne({
      where: {
        userId,
        projectId
      },
      transaction
    });
    if (!foundPermission) {
      await project_permissions.create({
        userId,
        projectId,
        permission
      }, {transaction});
    } else {
      await project_permissions.update({
        permission
      }, {
        where: {
          userId,
          projectId,
        },
        transaction
      });
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

const createOrUpdateProjectBidPermission = async(data: projectTypes.CreateOrUpdateProjectBidPermissionInput, transaction?: Transaction): Promise<boolean | Error> => {
  const { userId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    const foundPermission = await project_bid_permissions.findOne({
      where: {
        userId,
        projectBidId
      },
      transaction
    });
    if (!foundPermission) {
      await project_bid_permissions.create({
        userId,
        projectBidId,
        permission
      }, {transaction});
    } else {
      await project_bid_permissions.update({
        permission
      }, {
        where: {
          userId,
          projectBidId,
        },
        transaction
      });
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
  createProjectComponent,
  createProjectComponentBid,
  createOrUpdateProjectPermission,
  createOrUpdateProjectBidPermission
}