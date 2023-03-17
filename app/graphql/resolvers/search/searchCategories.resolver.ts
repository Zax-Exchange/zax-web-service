import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import ElasticCategoryService from "../../../elastic/category/ElasticCategoryService";
import { Category, SearchCategoriesInput } from "../../resolvers-types.generated";

const searchCategories = async (
  parent: any,
  { data }: { data: SearchCategoriesInput },
  context: any
) => {
  try {
    const allResults: SearchHit<any>[] = [];
    var results = await ElasticCategoryService.categoryAutoComplete(data.searchText);
    while(results.length > 0) {
      allResults.push(...results);
      results = await ElasticCategoryService.categoryAutoComplete(data.searchText, allResults.length)
    }
    const matches = allResults.map((result) => (result._source as any) as Category)
    return matches;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Query: { searchCategories },
};