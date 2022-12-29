import ElasticCompanyService from "../../../elastic/company/ElasticCompanyService";
import CompanyApiUtils from "../../../utils/companyUtils";
import {
  SearchVendorCompanyInput,
  VendorOverview,
} from "../../resolvers-types.generated";
import QueryBuilder from "./queryBuilder/queryBuilder";

const searchVendorCompanies = async (
  parent: any,
  { data }: { data: SearchVendorCompanyInput },
  context: any
) => {
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
        products: Object.keys(JSON.parse(vendor.productsAndMoq)),
        leadTime: vendor.leadTime,
      });
    }
    return res;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export default {
  Query: { searchVendorCompanies },
};
