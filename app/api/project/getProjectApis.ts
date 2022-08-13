import * as commonProjectTypes from "../types/common/projectTypes";
import * as enums from "../types/common/enums"
import ProjectApiUtils from "../utils/projectUtils";
import sequelize from "../../postgres/dbconnection";
import { users } from "../models/users";
import CompanyApiUtils from "../utils/companyUtils";
import { GetVendorProjectInput } from "../types/get/projectTypes";
import { project_bid_permissionsAttributes } from "../models/project_bid_permissions";

/**
 * Get the full list of vendor bidded projects with userId
 * @param userId 
 * @returns VendorProject[]
 */
const getVendorProjects = async(userId:string): Promise<commonProjectTypes.VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);
    
    const res = [];
    for (let permission of permissions) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(permission.projectBidId, permission.permission as enums.ProjectPermission);
      const project = await ProjectApiUtils.getPermissionedProject(userId, bid.projectId);
      const company = await CompanyApiUtils.getCompanyWithCompanyId(project.companyId);

      res.push({
        ...project,
        customerName: company.name,
        bidInfo: bid
      });
    }

    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};

/**
 * Returns a vendor project based on userId and projectId
 * @param data 
 * @returns VendorProject
 */
const getVendorProject = async (data: GetVendorProjectInput): Promise<commonProjectTypes.VendorProject> => {
  try {
    const { projectId, userId } = data;
    const permission = await sequelize.models.project_bid_permissions.findOne({
      where: {
        userId,
        projectId
      }
    }).then(p => p?.get({ plain:true }) as project_bid_permissionsAttributes);

    const bid = await ProjectApiUtils.getPermissionedProjectBid(permission.projectBidId, permission.permission);
    const project = await ProjectApiUtils.getPermissionedProject(userId, bid.projectId);
    const company = await CompanyApiUtils.getCompanyWithCompanyId(project.companyId);

    return {
      ...project,
      customerName: company.name,
      bidInfo: bid
    }
  } catch (error) {
    return Promise.reject(error);
  }
}


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
  getVendorProject,
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail,
  getProjectUsers,
  getProjectBidUsers 
}