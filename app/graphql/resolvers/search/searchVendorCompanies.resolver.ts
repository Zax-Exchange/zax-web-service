import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import ElasticCompanyService from "../../../elastic/company/ElasticCompanyService";
import CompanyApiUtils from "../../../utils/companyUtils";
import {
  ProductAndMoq,
  SearchVendorCompanyInput,
  VendorSearchHighlight,
  VendorSearchItem,
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
    return buildSearchItemsFromHits(companyDocs);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const searchVendorByName = async (
  parent: any,
  { data }: { data: SearchVendorCompanyInput },
  context: any
) => {
  try {
    const query = QueryBuilder.buildVendorSearchByNameQuery(data.userInput);
    const companyDocs = await ElasticCompanyService.searchVendorDocuments(
      query
    );
    return buildSearchItemsFromHits(companyDocs);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

async function buildSearchItemsFromHits(hits: SearchHit<unknown>[]) {
  const res: VendorSearchItem[] = [];
  for (let doc of hits) {
    const company = await CompanyApiUtils.getCompanyWithCompanyId(doc._id);

    // if somehow elastic search and db is inconsistent, we won't be able to find company in our db
    if (!company) continue;

    const vendor = await CompanyApiUtils.getVendorWithCompanyId(company.id);
    res.push({
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
