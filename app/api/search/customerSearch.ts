import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import CompanyApiUtils from "../utils/companyUtils";
import QueryBuilder from "./queryBuilder";
import {
  SearchCompanyInput,
  VendorOverview,
} from "../../graphql/resolvers-types.generated";
// search by project materials
// search by customer company name

const searchVendorCompanies = async (
  data: SearchCompanyInput
): Promise<VendorOverview[]> => {
  try {
    const query = QueryBuilder.buildVendorCompanySearchQuery(data);
    const companyDocs = await ElasticCompanyService.searchVendorDocuments(
      query
    );
    const res: VendorOverview[] = [];
    const ids: string[] = [];

    for (let comp of companyDocs) {
      ids.push(comp._id);
    }
    const companies = await CompanyApiUtils.getCompanyByIds(ids);

    for (let company of companies) {
      const vendor = await CompanyApiUtils.getVendorWithCompanyId(company.id);
      res.push({
        id: company.id,
        name: company.name,
        contactEmail: company.contactEmail,
        logo: company.logo,
        country: company.country,
        isVerified: company.isVerified,
        locations: vendor.locations,
        materials: vendor.materials,
        leadTime: vendor.leadTime,
        moq: vendor.moq,
      });
    }
    return res;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export { searchVendorCompanies };
