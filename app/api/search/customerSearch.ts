import * as projectTypes from "../types/common/projectTypes";
import * as companyTypes from "../types/common/companyTypes";
import ProjectApiUtils from "../utils/projectUtils";
import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import CompanyApiUtils from "../utils/companyUtils";
import QueryBuilder from "./queryBuilder";
// search by project materials
// search by customer company name

const searchVendorCompanies = async(data: companyTypes.SearchVendorInput): Promise<companyTypes.CompanyOverview[]> => {
  try {
    const query = QueryBuilder.buildVendorCompanySearchQuery(data);
    const companyDocs = await ElasticCompanyService.searchVendorDocuments(query);
    const res: companyTypes.CompanyOverview[] = [];
    const ids: number[] = [];
    for (let comp of companyDocs) {
      ids.push(parseInt(comp._id, 10));
    }
    const companies = await CompanyApiUtils.getCompanyByIds(ids);
    for (let company of companies) {
      res.push({
        id: company.id,
        name: company.name,
        logo: company.logo,
        country: company.country,
        isVendor: company.isVendor,
        isVerified: company.isVerified,
        locations: company.locations,
        materials: company.materials
      })
    }
    return res;
  } catch (error) {
    console.error(error)
    return Promise.reject(error);
  }
}

export {
  searchVendorCompanies
}