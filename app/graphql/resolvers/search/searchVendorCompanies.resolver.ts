import { SearchHitsMetadata, SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";
import ElasticCompanyService from "../../../elastic/company/ElasticCompanyService";
import CompanyApiUtils from "../../../utils/companyUtils";
import {
  ProductAndMoq,
  SearchVendorByNameInput,
  SearchVendorCompanyInput,
  VendorSearchHighlight,
  VendorSearchItem,
  VendorSearchResult,
} from "../../resolvers-types.generated";
import QueryBuilder from "./queryBuilder/queryBuilder";

const searchVendorCompanies = async (
  parent: any,
  { data }: { data: SearchVendorCompanyInput },
  context: any
) => {
  try {
    const res: VendorSearchResult = {
      hits: [],
      totalHits: 0
    };
  
    const query = QueryBuilder.buildVendorCompanySearchQuery(data);
    const companySearchResult = await ElasticCompanyService.searchVendorDocuments(
      query,
      data.from?.valueOf(),
      data.size?.valueOf()
    );
    return buildSearchItemsFromHits(companySearchResult);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const searchVendorByName = async (
  parent: any,
  { data }: { data: SearchVendorByNameInput },
  context: any
) => {
  try {
    const query = QueryBuilder.buildVendorSearchByNameQuery(data.userInput);
    const companyDocs = await ElasticCompanyService.searchVendorDocuments(
      query,
      data.from?.valueOf(),
      data.size?.valueOf()
    );
    return buildSearchItemsFromHits(companyDocs);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

async function buildSearchItemsFromHits(searchResult: SearchHitsMetadata<unknown>) {
  const res: VendorSearchResult = {
    hits: [],
    totalHits: 0
  };
  res.totalHits = (searchResult.total as SearchTotalHits).value
    
  for (let doc of searchResult.hits) {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(doc._id);
    if (company != null && company.isVendor) {
      const vendor = await CompanyApiUtils.getVendorWithCompanyId(company.id);
      res.hits.push({
        vendor: {
          id: company.id,
          name: company.name,
          contactEmail: company.contactEmail,
          logo: company.logo,
          country: company.country,
          isVerified: company.isVerified,
          locations: vendor.locations,
          products: (JSON.parse(vendor.productsAndMoq) as ProductAndMoq[]).map(
            (productAndMoq) => productAndMoq.product
          ),
          leadTime: vendor.leadTime,
        },
        highlight: buildHighlightResponse(doc.highlight),
      });
    }
  }
  return res;
}

function buildHighlightResponse(
  highlightDoc: Record<string, string[]> | undefined
): VendorSearchHighlight {
  const highlight: VendorSearchHighlight = {
    products: [],
    name: [],
  };
  if (highlightDoc?.products) {
    highlight.products = highlightDoc.products;
  }
  if (highlightDoc?.name) {
    highlight.name = highlightDoc.name;
  }
  return highlight;
}

export default {
  Query: { 
    searchVendorCompanies, 
    searchVendorByName,
  },
};
