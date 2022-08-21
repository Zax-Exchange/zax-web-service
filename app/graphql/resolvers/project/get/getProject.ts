import {
  getCustomerProject as getCustomerProjectApi,
  getCustomerProjects as getCustomerProjectsApi,
  getVendorProjects as getVendorProjectsApi,
  getVendorProject as getVendorProjectApi,
  getProjectDetail as getProjectDetailApi,
  getProjectUsers as getProjectUsersApi,
  getProjectBidUsers as getProjectBidUsersApi,
} from "../../../../api/project/getProjectApis";
import { GetProjectInput } from "../../../resolvers-types";

const getVendorProjects = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getVendorProjectsApi(args.userId);
};

const getVendorProject = (
  parent: any,
  args: Record<string, GetProjectInput>,
  context: any
) => {
  return getVendorProjectApi(args.data);
};

const getCustomerProject = (
  parent: any,
  args: Record<string, GetProjectInput>,
  context: any
) => {
  return getCustomerProjectApi(args.data);
};

const getCustomerProjects = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getCustomerProjectsApi(args.userId);
};

const getProjectDetail = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getProjectDetailApi(args.projectId);
};

const getProjectUsers = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getProjectUsersApi(args.projectId);
};

const getProjectBidUsers = (
  parent: any,
  args: Record<string, string>,
  context: any
) => {
  return getProjectBidUsersApi(args.projectBidId);
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
