import ElasticCategoryService from "../../../elastic/category/ElasticCategoryService";
import { Category, SearchCategoriesInput } from "../../resolvers-types.generated";

const searchCategories = async (
  parent: any,
  { data }: { data: SearchCategoriesInput },
  context: any
) => {
  try {
    const results = await ElasticCategoryService.categoryAutoComplete(data.searchText);
    const matches = results.map((result) => (result._source as any) as Category)
    return matches;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Query: { searchCategories },
};