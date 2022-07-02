import * as commonProjectTypes from "../../types/common/projectTypes";
import * as enums from "../../types/common/enums"
import { Model, ModelStatic } from "sequelize";
import sequelize from "../utils/dbconnection";

class ProjectApiUtils {

  static processProjects(projects: commonProjectTypes.Project[]): commonProjectTypes.PermissionedProject[] {
    return projects.map((project: commonProjectTypes.Project) => {
        return {
          ...project,
          permission: enums.ProjectPermission.VIEWER
        }
    });
  };
  

  static async checkProjectEditableByUser(model: ModelStatic<Model<any, any>>, userId: number, projectId: number): Promise<boolean> {
    const permission = await model.findOne({
        where: {
          userId,
          projectId
        }
    });
    if (!permission || 
      (permission.getDataValue("permission") === enums.ProjectPermission.VIEWER)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  static async checkProjectBidEditableByUser(model: ModelStatic<Model<any, any>>, userId: number, projectBidId: number): Promise<boolean> {
    const permission = await model.findOne({
        where: {
          userId,
          projectBidId
        }
    });
    if (!permission || 
      (permission.getDataValue("permission") === enums.ProjectPermission.VIEWER)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

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

  // get all user permissions for project/projectBids
  static async getAllPermissions(userId: number, model: ModelStatic<Model<any, any>>, type: string): Promise<number[]> {
    return await model.findAll({
      where: {
        userId
      }
    }).then(permissions => permissions.map(p => p.getDataValue(type)));
  }

  static async getProjectComponents(projectId:number): Promise<commonProjectTypes.ProjectComponent[] | Error> {
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

  static async getProjectComponentsBid(projectBidId: number): Promise<commonProjectTypes.ProjectComponentsBid[] | Error> {
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

  static async getProjectPermission(userId: number, projectId: number): Promise<enums.ProjectPermission | null | Error> {
    const project_permissions = sequelize.models.project_permissions;
    try {
      const permission = await project_permissions.findOne({
        attributes: ["permission"],
        where: {
          userId,
          projectId
        }
      }).then(p => p?.getDataValue("permission"));
      return Promise.resolve(permission);
    } catch(e) {
      return Promise.reject(e)
    }
  }
}

export default ProjectApiUtils;