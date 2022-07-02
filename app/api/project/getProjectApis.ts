import * as commonProjectTypes from "../../types/common/projectTypes";
import * as getProjectTypes from "../../types/get/projectTypes";
import * as enums from "../../types/common/enums"
import ProjectApiUtils from "./utils";
import UserApiUtils from "../user/utils";
import sequelize from "../utils/dbconnection";
import { Op, Model, ModelStatic, Transaction } from "sequelize";

// allows user to see all projects within permission
const getProjectsWithUserId = async(id: number): Promise<commonProjectTypes.Project[] | [] | Error> => {
  const projects = sequelize.models.projects;
  const project_permissions = sequelize.models.project_permissions;
  try {
    const projectIds: number[] = await ProjectApiUtils.getAllPermissions(id, project_permissions, "projectId");
    const res = [];
    const userProjects: commonProjectTypes.Project[] = await projects.findAll({
      where: {
        id: {
          [Op.in]: projectIds
        }
      }
    }).then(projects => {
      return projects.map(p => p.get({ plain:true }));
    });

    for (let project of userProjects) {
      const components = await ProjectApiUtils.getProjectComponents(project.id);
      res.push({
        ...project,
        components
      } as commonProjectTypes.Project);
    }
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e)
  }
};


// get specific project with user permission
// vendor should be able to see all projects
// customer should NOT see other customers' projects
// if user type is vendor, project permission is VIEWER
// if user type is customer, should only see his/her viewable/editable/owned projects
const getProjectWithProjectId = async(data: getProjectTypes.getProjectWithProjectIdInput): Promise<commonProjectTypes.PermissionedProject | Error> => {
  const projects = sequelize.models.projects;

  const {userId, projectId, isVendor } = data;
  try {
    const userPermission = await ProjectApiUtils.getProjectPermission(userId, projectId);
    const project = await projects.findOne({
      where: {
        id: projectId
      }
    }).then(p => p?.get({ plain: true }));

    if (!isVendor && !userPermission) {
      // user is customer and no permission, meaning user is other customers
      return Promise.reject(new Error("Permission denied"));
    }
    const components = await ProjectApiUtils.getProjectComponents(projectId);
    
    const res = {
      ...project,
      components,
      permission: userPermission ? userPermission : "VIEWER"
    };
    return Promise.resolve(res);
  } catch (e) {
    
    return Promise.reject(e);
  }
};

const getProjectBidsWithUserId = async(id: number): Promise<commonProjectTypes.ProjectBid[] | Error> => {
  const project_bids = sequelize.models.project_bids;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    const projectBidIds: number[] = await ProjectApiUtils.getAllPermissions(id, project_bid_permissions, "projectBidId");

    const userProjectBids: commonProjectTypes.ProjectBid[] = await project_bids.findAll({
      where: {
        id: {
          [Op.in]: projectBidIds
        }
      }
    }).then((projectBids) => {
      return projectBids.map(bid => bid.get({ plain:true }));
    });

    const res = [];

    for (let projectBid of userProjectBids) {
      const componentsBid = await ProjectApiUtils.getProjectComponentsBid(projectBid.id);
      res.push({
        ...projectBid,
        componentsBid
      } as commonProjectTypes.ProjectBid);
    }

    return Promise.resolve(res); 
  } catch (e) {
    return Promise.reject(e)
  }
};

// only customers that have access to this project can view
// only vendor that own/view/edit the projectbid can view
const getProjectBidWithProjectBidId = async(data: getProjectTypes.getProjectBidWithProjectBidIdInput): Promise<commonProjectTypes.PermissionedProjectBid | Error> => {
  const project_bids = sequelize.models.project_bids;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  const project_permissions = sequelize.models.project_permissions;
  const { userId, projectBidId, isVendor } = data;

  if (!isVendor) {
    // projectBid for customer
    // if customer permissions contain projectId that matches projectBid's projectId
    const projectIds: number[] = await ProjectApiUtils.getAllPermissions(userId, project_permissions, "projectId");
    const bid = await project_bids.findOne({
      where: {
        id: projectBidId,
        userId
      }
    }).then(b => b?.get({ plain:true }));
    
    if (projectIds.includes(bid.projectId)) {
      // customer viewable/editable/owned projects contains this bid's corresponding project
      return Promise.resolve({
        ...bid,
        permission: enums.ProjectPermission.VIEWER
      });
    } else {
      return Promise.reject(new Error("Permission denied"));
    }
  } else {
    // projectBid for vendor
    const permission: enums.ProjectPermission = await project_bid_permissions.findOne({
      attributes: ["permission"],
      where: {
        userId,
        projectBidId
      }
    }).then(p => p?.get({ plain:true }));

    if (!permission) {
      return Promise.reject(new Error("Permission denied"));
    }

    const projectBid = await project_bids.findOne({
      where: {
        id: projectBidId
      }
    }).then(b => b?.get({ plain:true }));

    const componentsBid = await ProjectApiUtils.getProjectComponentsBid(projectBid.id);
    
    return {
      ...projectBid,
      componentsBid,
      permission
    }
  }
}


export {
  getProjectsWithUserId,
  getProjectWithProjectId,
  getProjectBidsWithUserId,
  getProjectBidWithProjectBidId
}