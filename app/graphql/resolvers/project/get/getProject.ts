import { 
  getCustomerProjects as getCustomerProjectApi,
  getVendorProjects as getVendorProjectApi
 } from "../../../../api/project/getProjectApis";

const getVendorProjects = (parent: any, args: Record<string, number>, context:any) => {

  return getVendorProjectApi(args.userId);
};

const getCustomerProjects = (parent: any, args: Record<string, number>, context:any) => {
  return getCustomerProjectApi(args.userId);
};

export {
  getVendorProjects,
  getCustomerProjects
};