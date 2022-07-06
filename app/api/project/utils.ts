import * as commonProjectTypes from "../../types/common/projectTypes";
import * as getProjectTypes from "../../types/get/projectTypes";
import * as enums from "../../types/common/enums"
import UserApiUtils from "../user/utils";
import { Model, ModelStatic, Transaction } from "sequelize";
import sequelize from "../utils/dbconnection";
import { project_bids } from "../models/project_bids";

class ProjectApiUtils {
  static async getIdsByPermission(userId: number, permission: enums.ProjectPermission, model: ModelStatic<Model<any, any>>, attr: string): Promise<number[]> {
    //attr will be either "projectId" or "projectBidId"
    try {
      return await model.findAll({
        attributes: [attr],
        where: {
          userId,
          permission
        }
      }).then(data => data.map(row => row.getDataValue(attr)));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // get all user viewable/editable/own project or bids
  static async getAllUserProjectOrBidIds(userId: number, model: ModelStatic<Model<any, any>>, type: string): Promise<number[]> {
    return await model.findAll({
      where: {
        userId
      }
    }).then(permissions => permissions.map(p => p.getDataValue(type)));
  }

  static async getProjectComponents(projectId:number): Promise<commonProjectTypes.ProjectComponent[]> {
    const project_components = sequelize.models.project_components;
    try {
      const components = await project_components.findAll({
        where: {
          projectId
        }
      }).then(comps => comps.map(comp => comp.get({ plain:true })));
      return Promise.resolve(components);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async getProjectComponentsBid(projectBidId: number): Promise<commonProjectTypes.ProjectComponentsBid[]> {
    const project_component_bids = sequelize.models.project_component_bids;

    try {
      const components = await project_component_bids.findAll({
        where: {
          projectBidId
        }
      }).then(comps => comps.map(comp => comp.get({ plain:true })));
      return Promise.resolve(components);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async getProject(id: number): Promise<commonProjectTypes.Project> {
    const projects = sequelize.models.projects;

    try {
      return await projects.findByPk(id).then(p => p?.get({ plain:true }));
    } catch(e) {
      return Promise.reject(e);
    }
  } 

  static async getProjectBid(id: number): Promise<commonProjectTypes.ProjectBid> {
    const project_bids = sequelize.models.project_bids;

    try {
      return await project_bids.findByPk(id).then(b => b?.get({ plain:true }));
    } catch(e) {
      return Promise.reject(e);
    }
  } 

  static async getProjectBidWithProjectId(projectId: number, userId: number): Promise<commonProjectTypes.ProjectBid> {
    const project_bids = sequelize.models.project_bids;
    const project_component_bids = sequelize.models.project_component_bids;

    try {
      const projectBid = await project_bids.findOne({
        where: {
          projectId,
          userId
        }
      }).then(b => b?.get({ plain:true }));
      const components = await project_component_bids.findAll({
        where: {
          projectBidId: projectBid.id
        }
      }).then(comps => comps.map(comp => {
        return {
          projectComponentId: comp.getDataValue("projectComponentId"),
          quantityPrices: comp.getDataValue("quantityPrices")
        }
      }));

      const res = {
        ...projectBid,
        components
      }

      return Promise.resolve(res);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  // for customer, get all bids with projectId
  static async getPermissionedProjectBids(projectId: number, userId: number): Promise<commonProjectTypes.PermissionedProjectBid[]> {
    const project_bids = sequelize.models.project_bids;
    const project_bid_permissions = sequelize.models.project_bid_permissions;
    try {
      const bids = await project_bids.findAll({
        where: {
          projectId
        }
      }).then(bids => bids.map((b) => b.get({ plain:true })));
      const res = [];
      for (let bid of bids) {
        const permission = await ProjectApiUtils.getProjectOrBidPermission(project_bid_permissions, "projectBidId", userId, bid.id);
        res.push({
          ...bid,
          permission: enums.ProjectPermission.VIEWER
        });
      }
      return Promise.resolve(res);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async getProjectOrBidPermission(model: ModelStatic<Model<any, any>>, type: string, userId: number, id: number, transaction?: Transaction): Promise<enums.ProjectPermission> {
    try {
      const permission = await model.findOne({
        attributes: ["permission"],
        where: {
          userId,
          [type]: id
        },
        transaction
      }).then(p => p?.get("permission")) as enums.ProjectPermission;

      return Promise.resolve(permission);
    } catch(e) {
      return Promise.reject(e)
    }
  }

  static async createPermission(model: ModelStatic<Model<any, any>>, type: string, userId: number, id: number, permission: enums.ProjectPermission, transaction?:Transaction): Promise<boolean> {
    try {
      await model.create({
        userId,
        [type]: id,
        permission
      }, {transaction});
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject(e)
    }
  }

  static async updatePermission(model: ModelStatic<Model<any, any>>, type: string, userId: number, id: number, permission: enums.ProjectPermission, transaction?:Transaction): Promise<boolean> {
    try {
      await model.update({
        permission
      },{
        where: {
          userId,
          [type]: id,
        },
        transaction
      });
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject(e)
    }
  }

  static async getPermissionedProject(userId: number, projectId: number): Promise<commonProjectTypes.PermissionedProject> {
    const projects = sequelize.models.projects;
    const project_permissions = sequelize.models.project_permissions;

    try {
      const isVendor = await UserApiUtils.isVendorWithUserId(userId);
      const userPermission = await ProjectApiUtils.getProjectOrBidPermission(project_permissions, "projectId", userId, projectId);
      const project = await ProjectApiUtils.getProject(projectId);

      if (!isVendor && !userPermission) {
        // user is customer and no permission, meaning user is other customers
        return Promise.reject(new Error("Permission denied"));
      }
      const components = await ProjectApiUtils.getProjectComponents(projectId);
      
      // vendor permission will always be viewer, customer permission will vary
      const res = {
        ...project,
        components,
        permission: userPermission ? userPermission : "VIEWER"
      } as commonProjectTypes.PermissionedProject;
      return Promise.resolve(res);
    } catch (e) {
      
      return Promise.reject(e);
    }
  };

  // for vendor, gets a single projectBid with projectBidId
  static async getPermissionedProjectBid(userId: number, projectBidId: number): Promise<commonProjectTypes.PermissionedProjectBid> {
    const bidModel = sequelize.models.project_bids;
    const project_bid_permissions = sequelize.models.project_bid_permissions;
    const project_permissions = sequelize.models.project_permissions;
    try {
      const rawUserBid = await bidModel.findByPk(projectBidId);
      const components = await (rawUserBid as project_bids).getProject_component_bids().then(comps => comps.map(comp => comp.get({ plain:true }))) as commonProjectTypes.ProjectComponentsBid[]; 
      
      const userBid = rawUserBid?.get({ plain:true });
    
      // projectBid for vendor
      const permission = await ProjectApiUtils.getProjectOrBidPermission(project_bid_permissions, "projectBidId", userId, projectBidId) as enums.ProjectPermission;

      if (!permission) {
        return Promise.reject(new Error("Permission denied"));
      }
      
      return {
        ...userBid,
        components,
        permission
      }
      
    } catch(e) {
      return Promise.reject(e);
    }
  }

  static async updateProjectStatus(projectId: number, status: enums.ProjectStatus, transaction?: Transaction): Promise<boolean> {
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
  }
}

export default ProjectApiUtils;