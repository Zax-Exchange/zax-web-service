import { searchCustomerProjects as searchCustomerProjectsApi } from "../../../api/search/vendorSearch";

const searchCustomerProjects = (parent: any, args: Record<string, string>, context: any) => {
  return searchCustomerProjectsApi(args.searchQuery);
};

export {
  searchCustomerProjects
}