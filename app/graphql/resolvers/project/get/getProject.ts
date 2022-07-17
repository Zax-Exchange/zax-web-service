import { 
  getCustomerProjects as getCustomerProjectApi,
  getVendorProjects as getVendorProjectApi,
  getProjectDetail as getProjectDetailApi,
  getProjectUsers as getProjectUsersApi,
  getProjectBidUsers as getProjectBidUsersApi
 } from "../../../../api/project/getProjectApis";

const getVendorProjects = (parent: any, args: Record<string, number>, context:any) => {
  return getVendorProjectApi(args.userId);
};

const getCustomerProjects = (parent: any, args: Record<string, number>, context:any) => {
  return getCustomerProjectApi(args.userId);
};

const getProjectDetail = (parent: any, args: Record<string, number>, context:any) => {
  return getProjectDetailApi(args.projectId);
}

const getProjectUsers = (parent: any, args: Record<string, number>, context:any) => {
  return getProjectUsersApi(args.projectId);
}

const getProjectBidUsers = (parent: any, args: Record<string, number>, context:any) => {
  return getProjectBidUsersApi(args.projectBidId);
}
export {
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail,
  getProjectUsers,
  getProjectBidUsers
};