import * as commonProjectTypes from "../types/common/projectTypes";
import * as enums from "../types/common/enums"
import ProjectApiUtils from "../utils/projectUtils";
import sequelize from "../../postgres/dbconnection";
import { users } from "../models/users";

const getVendorProjects = async(userId:string): Promise<commonProjectTypes.VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);
    
    const res = [];
    for (let permission of permissions) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(permission.projectBidId, permission.permission as enums.ProjectPermission);
      const project = await ProjectApiUtils.getPermissionedProject(userId, bid.projectId);
      res.push({
        ...project,
        bidInfo: bid
      });
    }

    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};



const getCustomerProjects = async(userId: string): Promise<commonProjectTypes.CustomerProject[]> => {
  try {
    const projectPermissions = await ProjectApiUtils.getProjectPermissions(userId);

    const res = [];
    for (let permission of projectPermissions) {
      const project = await ProjectApiUtils.getPermissionedProject(userId, permission.projectId, permission.permission as enums.ProjectPermission);
      const bids = await ProjectApiUtils.getProjectBidsByProjectId(permission.projectId);
      res.push({
        ...project,
        bids
      });
    }
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e);
  }
};

const getProjectDetail = async(id: string): Promise<commonProjectTypes.Project> => {
  try {
    return await ProjectApiUtils.getProject(id);
  } catch(e) {
    return Promise.reject(e);
  }
};

const getProjectUsers = async(projectId: string): Promise<commonProjectTypes.UserPermission[]> => {
try {
    return await ProjectApiUtils.getProjectUsers(projectId);
  } catch(e) {
    return Promise.reject(e);
  }
};

const getProjectBidUsers = async(projectBidId: string): Promise<commonProjectTypes.UserPermission[]> => {
try {
    return await ProjectApiUtils.getProjectBidUsers(projectBidId);
  } catch(e) {
    return Promise.reject(e);
  }
};

export {
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail,
  getProjectUsers,
  getProjectBidUsers
}