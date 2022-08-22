import * as commonProjectTypes from "../types/common/projectTypes";
import * as enums from "../types/common/enums";
import ProjectApiUtils from "../utils/projectUtils";
import sequelize from "../../postgres/dbconnection";
import { users } from "../models/users";
import CompanyApiUtils from "../utils/companyUtils";
import { GetProjectInput } from "../types/get/projectTypes";
import { project_bid_permissionsAttributes } from "../models/project_bid_permissions";
import { project_permissionsAttributes } from "../models/project_permissions";
import {
  CustomerProject,
  Project,
  ProjectPermission,
  UserPermission,
  VendorProject,
} from "../../graphql/resolvers-types";

/**
 * Get the full list of vendor bidded projects with userId
 * @param userId
 * @returns VendorProject[]
 */
const getVendorProjects = async (userId: string): Promise<VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);

    const res = [];
    for (let permission of permissions) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(
        permission.projectBidId,
        permission.permission as ProjectPermission
      );
      const project = (await ProjectApiUtils.getPermissionedProject(
        bid.projectId
      )) as VendorProject;
      const company = await CompanyApiUtils.getCompanyWithCompanyId(
        project.companyId
      );

      res.push({
        ...project,
        permission: permission.permission,
        customerName: company.name,
        bidInfo: bid,
      });
    }

    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Returns a vendor project based on userId and projectId
 * @param data
 * @returns VendorProject
 */
const getVendorProject = async (
  data: GetProjectInput
): Promise<VendorProject> => {
  try {
    const { projectId, userId } = data;
    const permission = await sequelize.models.project_bid_permissions
      .findOne({
        where: {
          userId,
          projectId,
        },
      })
      .then(
        (p) => p?.get({ plain: true }) as project_bid_permissionsAttributes
      );

    const bid = await ProjectApiUtils.getPermissionedProjectBid(
      permission.projectBidId,
      permission.permission
    );
    const project = (await ProjectApiUtils.getPermissionedProject(
      bid.projectId
    )) as VendorProject;
    const company = await CompanyApiUtils.getCompanyWithCompanyId(
      project.companyId
    );

    return {
      ...project,
      customerName: company.name,
      bidInfo: bid,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCustomerProjects = async (
  userId: string
): Promise<CustomerProject[]> => {
  try {
    const projectPermissions = await ProjectApiUtils.getProjectPermissions(
      userId
    );

    const res = [];
    for (let permission of projectPermissions) {
      const project = (await ProjectApiUtils.getPermissionedProject(
        permission.projectId,
        permission.permission as ProjectPermission
      )) as CustomerProject;
      const bids = await ProjectApiUtils.getProjectBidsByProjectId(
        permission.projectId
      );
      res.push({
        ...project,
        bids,
      });
    }
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getCustomerProject = async (
  data: GetProjectInput
): Promise<CustomerProject> => {
  try {
    const { projectId, userId } = data;
    const permission = await sequelize.models.project_permissions
      .findOne({
        where: {
          userId,
          projectId,
        },
      })
      .then((p) => p?.get({ plain: true }) as project_permissionsAttributes);

    const project = (await ProjectApiUtils.getPermissionedProject(
      permission.projectId,
      permission.permission as ProjectPermission
    )) as CustomerProject;
    const bids = await ProjectApiUtils.getProjectBidsByProjectId(
      permission.projectId
    );
    return {
      ...project,
      bids,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectDetail = async (id: string): Promise<Project> => {
  try {
    return await ProjectApiUtils.getProject(id);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectUsers = async (
  projectId: string
): Promise<UserPermission[]> => {
  try {
    return await ProjectApiUtils.getProjectUsers(projectId);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectBidUsers = async (
  projectBidId: string
): Promise<UserPermission[]> => {
  try {
    return await ProjectApiUtils.getProjectBidUsers(projectBidId);
  } catch (e) {
    return Promise.reject(e);
  }
};

export {
  getVendorProject,
  getVendorProjects,
  getCustomerProject,
  getCustomerProjects,
  getProjectDetail,
  getProjectUsers,
  getProjectBidUsers,
};
