import { searchVendorCompanies as searchVendorCompaniesApi } from "../../../api/search/customerSearch";
import { SearchCompanyInput } from "../../resolvers-types";

const searchVendorCompanies = async (
  parent: any,
  args: Record<string, SearchCompanyInput>,
  context: any
) => {
  return searchVendorCompaniesApi(args.searchInput);
};

export { searchVendorCompanies };
