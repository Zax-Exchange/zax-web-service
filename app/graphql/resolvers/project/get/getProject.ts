import { 
  getCustomerProjects as getCustomerProjectApi,
  getVendorProjects as getVendorProjectApi
 } from "../../../../api/project/getProjectApis";

const getVendorProjects = (id: number) => {
  return getVendorProjectApi(id);
};

const getCustomerProjects = (id: number) => {
  return getCustomerProjectApi(id);
};

export {
  getVendorProjects,
  getCustomerProjects
};