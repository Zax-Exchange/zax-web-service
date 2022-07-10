import { 
  getCustomerProjects as getCustomerProjectApi,
  getVendorProjects as getVendorProjectApi,
  getProjectDetail as getProjectDetailApi
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
export {
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail
};