import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/create/projectTypes";
import * as enums from "../../types/common/enums";
import { Transaction } from "sequelize/types";
import ProjectApiUtils from "./utils";
import UserApiUtils from "../user/utils";

//TODO: findOrCreate product or materials when creating project
const createProject = async(data: projectTypes.CreateProjectInput): Promise<boolean> => {
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
      const companyId = await user?.getDataValue("companyId");
      const project = await projects.create({
        userId,
        name,
        deliveryDate,
        deliveryLocation,
        budget,
        design,
        companyId,
        status: enums.ProjectStatus.OPEN
      }, { transaction });
      const projectId = project.getDataValue("id");
      await createProjectComponents(projectId, components, companyId, transaction);
      await createOrUpdateProjectPermission({ userId, projectId, permission: enums.ProjectPermission.OWNER }, transaction);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectComponents = async(projectId: number, components: projectTypes.CreateProjectComponentInput[], companyId: number, transaction: Transaction): Promise<boolean> => {
  const project_components = sequelize.models.project_components;
  const materialsModel = sequelize.models.materials;
  const company_materials = sequelize.models.company_materials;

  try {
    for (let component of components) {

      for (let material of component.materials) {
        await materialsModel.findOrCreate({
          where: {
            name: material
          },
          transaction
        }).then(async ([found, created]) => {
          if(created) {
            await company_materials.create({
              companyId,
              materialId: found.get("id")
            }, {transaction});
          }
        })
      }
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
      await createProjectBidComponents(projectBidId, components, transaction);
      await createOrUpdateProjectBidPermission({ userId, projectBidId, permission: enums.ProjectPermission.OWNER }, transaction);
      await ProjectApiUtils.updateProjectStatus(projectId, enums.ProjectStatus.IN_PROGRESS);
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const createProjectBidComponents = async(projectBidId: number, components: projectTypes.CreateProjectBidComponentInput[], transaction: Transaction): Promise<boolean> => {
  const project_bid_components = sequelize.models.project_bid_components;
  try {
    for (let component of components) {
      const { projectComponentId, quantityPrices } = component;
      await project_bid_components.create({
        projectBidId,
        projectComponentId,
        quantityPrices
      }, {transaction});
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
    await project_permissions.findOrCreate({
      where: {
        userId,
        projectId
      },
      defaults: {
        permission
      },
      transaction
    }).then(async ([foundPermission, created]) => {
      if (!created) {
        await foundPermission.update("permission", permission, {transaction});
      }
    });
    return true;
  } catch (e) {
    console.error(e)
    return Promise.reject(e);
  }
};

const createOrUpdateProjectBidPermission = async(data: projectTypes.CreateOrUpdateProjectBidPermissionInput, transaction?: Transaction): Promise<boolean> => {
  const { userId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    await project_bid_permissions.findOrCreate({
      where: {
        userId,
        projectBidId
      },
      defaults: {
        permission
      },
      transaction
    }).then(async ([foundPermission, created]) => {
      if (!created) {
        await foundPermission.update("permission", permission, {transaction});
      }
    });
    return true;
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