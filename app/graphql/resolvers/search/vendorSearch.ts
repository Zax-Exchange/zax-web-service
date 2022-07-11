import { searchCustomerProjects as searchCustomerProjectsApi } from "../../../api/search/vendorSearch";
import * as projectTypes from "../../../api/types/common/projectTypes";
const searchCustomerProjects = (parent: any, args: Record<string, projectTypes.SearchProjectInput>, context: any) => {
  return searchCustomerProjectsApi(args.searchInput);
};

export {
  searchCustomerProjects
}