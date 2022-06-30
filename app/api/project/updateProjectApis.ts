import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums";
import { Transaction } from "sequelize/types";

const updateProject = async(data: projectTypes.UpdateProjectInput): Promise<boolean | Error> => {
  const { id, name, deliveryDate, deliveryLocation, budget, design, status, components } = data;
  const projects = sequelize.models.projects;
  try {
    await sequelize.transaction(async transaction => {
      await projects.update({
        name,
        deliveryDate,
        deliveryLocation,
        budget,
        design,
        status
      }, {
        where: {
          id,
        },
        transaction
      });
      return await updateProjectComponent(components, transaction);
    });
    return Promise.resolve(true);
  }
  catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const updateProjectComponent = async(components: projectTypes.UpdateProjectComponentInput[], transaction?: Transaction): Promise<boolean | Error> => {
  const project_components = sequelize.models.project_components;
  try {
    for (let component of components) {
      const { id, name, materials, dimension, postProcess } = component;
      await project_components.update({
        name,
        materials,
        dimension,
        postProcess
      }, {
        where: {
          id
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

const updateProjectBid = async(data: projectTypes.UpdateProjectBidInput): Promise<boolean | Error> => {
  const { id, comments, components } = data;
  const project_bids = sequelize.models.project_bids;

  try {
    await sequelize.transaction(async (transaction) => {
      await project_bids.update({
        comments
      }, {
        where: {
          id
        },
        transaction
      })
      await updateProjectComponentBid(components, transaction);

    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const updateProjectComponentBid = async(components: projectTypes.UpdateProjectComponentBidInput[], transaction?: Transaction): Promise<boolean | Error> => {
  const project_component_bids = sequelize.models.project_component_bids;

  try {
    for (let component of components) {
      const { id, quantityPrices } = component;
      await project_component_bids.update({
        quantityPrices
      }, {
        where: {
          id
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

const updateProjectStatus = async (projectId: number, status: enums.ProjectStatus, transaction?: Transaction): Promise<boolean | Error> => {
  const projects = sequelize.models.projects;
  try {
    await projects.update({
      status
    }, {
      where: {
        id: projectId
      },
      transaction
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export {
  updateProject,
  updateProjectComponent,
  updateProjectBid,
  updateProjectComponentBid,
  updateProjectStatus
}