import { searchVendorCompanies as searchVendorCompaniesApi } from "../../../api/search/customerSearch";
import * as companyTypes from "../../../api/types/common/companyTypes";

const searchVendorCompanies = async (parent: any, args: Record<string, companyTypes.SearchVendorInput>, context: any) => {
  return searchVendorCompaniesApi(args.searchInput)
}

export {
  searchVendorCompanies
}