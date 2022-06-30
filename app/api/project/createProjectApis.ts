import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums";

const createProject = async(data: projectTypes.CreateProjectInput) => {
  const projects = sequelize.models.projects;
  const project_permissions = sequelize.models.project_permissions;

  const {userId, name, deliveryDate, deliveryLocation, budget, design, components} = data;

  try {
    
    const project = await projects.create({
      userId, name, deliveryDate, deliveryLocation, budget, design
    })
    const projectId = project.getDataValue("id");
    await createProjectComponent(projectId, components)
    await project_permissions.create({
      userId,
      projectId,
      permission: enums.ProjectPermission.OWNER
    })
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const createProjectComponent = async(projectId: number, components: projectTypes.CreateProjectComponentInput[]) => {
  const project_components = sequelize.models.project_components;
  
  try {
    for (let component of components) {

      await project_components.create({
        projectId,
        ...component
      })
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const createProjectBid = async(data: projectTypes.CreateProjectBidInput) => {
  const project_bids = sequelize.models.project_bids;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  const { userId, projectId, comments, components } = data;
  try {
    const projectBid = await project_bids.create({
      userId, 
      projectId, 
      comments
    });
    const projectBidId = projectBid.getDataValue("id");
    await createProjectComponentBid(projectBidId, components);
    await project_bid_permissions.create({
      projectBidId,
      userId,
      permission: enums.ProjectPermission.OWNER
    })
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const createProjectComponentBid = async(projectBidId: number, components: projectTypes.CreateProjectComponentBidInput[]) => {
  const project_component_bids = sequelize.models.project_component_bids;
  try {
    for (let component of components) {
      for (let componentBidQuantityPrice of component.componentBidQuantityPrices) {
        const { projectComponentId, quantityPrices } = componentBidQuantityPrice;
        await project_component_bids.create({
          projectBidId,
          projectComponentId,
          quantityPrices
        })  
        
      }
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(false);
  }
};

const createProjectPermission = async(data: projectTypes.CreateProjectPermissionInput) => {
  const { userId, projectId, permission } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    await project_permissions.create({
      userId,
      projectId,
      permission
    })
    return Promise.resolve(true);
  } catch (e) {
    return Promise.resolve(false);
  }
};

const createProjectBidPermission = async(data: projectTypes.CreateProjectBidPermissionInput) => {
  const { userId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    await project_bid_permissions.create({
      userId,
      projectBidId,
      permission
    })
    return Promise.resolve(true);
  } catch (e) {
    return Promise.resolve(false);
  }
};

export {
  createProject,
  createProjectBid,
  createProjectComponent,
  createProjectComponentBid,
  createProjectPermission,
  createProjectBidPermission
}