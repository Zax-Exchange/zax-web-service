import sequelize from "../../postgres/dbconnection";
import * as projectTypes from "../types/update/projectTypes";
import * as enums from "../types/common/enums";
import { Transaction } from "sequelize/types";
import { createOrUpdateProjectPermission, createOrUpdateProjectBidPermission } from "./createProjectApis";
import { Op } from "sequelize";
import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import { deleteProjectPermissions } from "./deleteProjectApis";

const updateProject = async(data: projectTypes.UpdateProjectInput): Promise<boolean> => {
  const { id, projectData, componentsInput } = data;
  const { toFindOrCreate, toDelete } = componentsInput;
  const {
    deliveryDate,
    deliveryCountry,
    deliveryCity,
    budget
  } = projectData;
  const projects = sequelize.models.projects;
  const materials = [];
  for (let comp of toFindOrCreate) {
    for (let mat of comp.materials) {
      materials.push(mat);
    }
  }

  try {
    ElasticProjectService.updateProjectDocument({projectId:id, deliveryDate, deliveryCountry, deliveryCity, budget, materials});
    await sequelize.transaction(async transaction => {
      await projects.update(projectData, {
        where: {
          id
        },
        transaction
      });
      await updateProjectComponents(toFindOrCreate, transaction);
    });
    
    return true;
  }
  catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// this goes with update project
const updateProjectComponents = async(components: projectTypes.UpdateProjectComponentInputData[], transaction?: Transaction): Promise<boolean> => {
  const project_components = sequelize.models.project_components;
  try {
    for (let component of components) {
      const { id, name, materials, dimension, postProcess } = component;

      await project_components.findOrCreate({
        where: {id: id}, 
        defaults: {
          name, 
          materials, 
          dimension, 
          postProcess
        },
        transaction 
      }).then(async ([comp, created]) => {
        if (!created) {
          await comp.update({
            name,
            materials,
            dimension,
            postProcess
          }, {transaction});
        }
      });

    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const updateProjectBid = async(data: projectTypes.UpdateProjectBidInput): Promise<boolean> => {
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
      await updateProjectBidComponents(components, transaction);

    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

// this goes with update project bid
const updateProjectBidComponents = async(components: projectTypes.UpdateProjectBidComponentInput[], transaction?: Transaction): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;

  try {
    for (let component of components) {
      const { id, quantityPrices } = component;
      await project_bid_components.update({
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

// bulk create or update project permissions
const updateProjectPermissions = async (data: projectTypes.UpdateProjectPermissionsInput): Promise<boolean> => {
  const { viewers, editors } = data;
  try {
    await sequelize.transaction(async (transaction) => {

      for (let userId of viewers.userIds) {
        await createOrUpdateProjectPermission({userId, projectId: viewers.projectId, permission: viewers.permission}, transaction);
      }
      for (let userId of editors.userIds) {
        await createOrUpdateProjectPermission({userId, projectId: editors.projectId, permission: editors.permission}, transaction);
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const updateProjectBidPermissions = async (data: projectTypes.UpdateProjectBidPermissionsInput): Promise<boolean> => {
  const { viewers, editors } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of viewers.userIds) {
        await createOrUpdateProjectBidPermission({userId, projectBidId: viewers.projectBidId, permission: viewers.permission}, transaction);
      }
      for (let userId of editors.userIds) {
        await createOrUpdateProjectBidPermission({userId, projectBidId: editors.projectBidId, permission: editors.permission}, transaction);
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};



export {
  updateProject,
  updateProjectComponents,
  updateProjectBid,
  updateProjectBidComponents,
  updateProjectPermissions,
  updateProjectBidPermissions
}