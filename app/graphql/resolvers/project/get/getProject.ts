import { 
  getCustomerProjects as getCustomerProjectApi,
  getVendorProjects as getVendorProjectsApi,
  getVendorProject as getVendorProjectApi,
  getProjectDetail as getProjectDetailApi,
  getProjectUsers as getProjectUsersApi,
  getProjectBidUsers as getProjectBidUsersApi
 } from "../../../../api/project/getProjectApis";
import { GetVendorProjectInput } from "../../../../api/types/get/projectTypes";

const getVendorProjects = (parent: any, args: Record<string, string>, context:any) => {
  return getVendorProjectsApi(args.userId);
};

const getVendorProject = (parent: any, args: Record<string, GetVendorProjectInput>, context:any) => {
  return getVendorProjectApi(args.data);
};

const getCustomerProjects = (parent: any, args: Record<string, string>, context:any) => {
  return getCustomerProjectApi(args.userId);
};

const getProjectDetail = (parent: any, args: Record<string, string>, context:any) => {
  return getProjectDetailApi(args.projectId);
}

const getProjectUsers = (parent: any, args: Record<string, string>, context:any) => {
  return getProjectUsersApi(args.projectId);
}

const getProjectBidUsers = (parent: any, args: Record<string, string>, context:any) => {
  return getProjectBidUsersApi(args.projectBidId);
}
export {
  getVendorProject,
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail,
  getProjectUsers,
  getProjectBidUsers
};