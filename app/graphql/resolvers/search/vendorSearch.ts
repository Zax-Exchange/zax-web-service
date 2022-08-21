import { searchCustomerProjects as searchCustomerProjectsApi } from "../../../api/search/vendorSearch";
import { SearchProjectInput } from "../../resolvers-types";
const searchCustomerProjects = (
  parent: any,
  args: Record<string, SearchProjectInput>,
  context: any
) => {
  return searchCustomerProjectsApi(args.searchInput);
};

export { searchCustomerProjects };
