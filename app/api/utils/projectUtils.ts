import * as commonProjectTypes from "../types/common/projectTypes";
import * as getProjectTypes from "../types/get/projectTypes";
import * as enums from "../types/common/enums"
import UserApiUtils from "./userUtils";
import { Model, ModelStatic, Op, Transaction } from "sequelize";
import sequelize from "../../postgres/dbconnection";
import { project_bids } from "../models/project_bids";
import { users } from "../models/users";
import { project_bid_permissionsAttributes } from "../models/project_bid_permissions";
import { project_permissionsAttributes } from "../models/project_permissions";
import { projects, projectsAttributes } from "../models/projects";

class ProjectApiUtils {
  static async getBidPermissions(userId: number): Promise<project_bid_permissionsAttributes[]> {
    return await sequelize.models.users.findByPk(userId).then(async (user) => {
      return await (user as users).getProject_bid_permissions().then(permissions => permissions.map(p => p.get({ plain:true })));
    });
  }

  static async getProjectPermissions(userId: number): Promise<project_permissionsAttributes[]> {
    return await sequelize.models.users.findByPk(userId).then(async (user) => {
      return await (user as users).getProject_permissions().then(permissions => permissions.map(p => p.get({ plain:true })));
    });
  }

  /**
   * Get project components with projectId
   * @param projectId 
   * @returns commonProjectTypes.ProjectComponent
   */
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

  /**
   * Get project bid components with projectBidId
   * @param projectBidId 
   * @returns 
   */
  static async getBidComponents(projectBidId: number): Promise<commonProjectTypes.ProjectBidComponent[]> {
    const project_bid_components = sequelize.models.project_bid_components;

    try {
      const components = await project_bid_components.findAll({
        where: {
          projectBidId
        }
      }).then(comps => comps.map(comp => comp.get({ plain:true })));
      return Promise.resolve(components);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  /**
   * Returns a generic project information
   * @param id 
   * @returns Project
   */
  static async getProject(id: number): Promise<commonProjectTypes.Project> {
    const projects = sequelize.models.projects;

    try {

      return await projects.findByPk(id).then(async p => {
        const components = await (p as projects)?.getProject_components().then(comps => comps.map(comp => comp.get({plain:true})));
        return {
          ...p?.get({plain: true}),
          components
        }
      });
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

  // for customer, get all bids with projectId
  static async getPermissionedProjectBids(projectId: number): Promise<commonProjectTypes.PermissionedProjectBid[]> {
    const project_bids = sequelize.models.project_bids;
    try {
      const bids = await project_bids.findAll({
        where: {
          projectId
        }
      }).then(bids => bids.map((b) => b.get({ plain:true })));
      const res = [];
      for (let bid of bids) {
        res.push({
          ...bid,
          permission: enums.ProjectPermission.VIEWER
        });
      }
      return res;
    } catch(e) {
      return Promise.reject(e);
    }
  }

  // for vendor & customer
  static async getPermissionedProject(userId: number, projectId: number, userPermission?: enums.ProjectPermission): Promise<commonProjectTypes.PermissionedProject> {
    try {
      const project = await ProjectApiUtils.getProject(projectId);
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
  static async getPermissionedProjectBid(projectBidId: number, permission: enums.ProjectPermission): Promise<commonProjectTypes.PermissionedProjectBid> {
    try {
      const rawUserBid = await sequelize.models.project_bids.findByPk(projectBidId);
      const components = await (rawUserBid as project_bids).getProject_bid_components().then(comps => comps.map(comp => comp.get({ plain:true }))) as commonProjectTypes.ProjectBidComponent[]; 
      
      const userBid = rawUserBid?.get({ plain:true });
      
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

  static async getProjectsByIds(projectIds: number[]): Promise<projectsAttributes[]> {
    try {
      return await sequelize.models.projects.findAll({
        where: {
          id: {
            [Op.in]: projectIds
          }
        }
      }).then(ps => ps.map(p => p.get({plain:true})));
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

export default ProjectApiUtils;