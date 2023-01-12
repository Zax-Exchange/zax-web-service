import ElasticProductService from "../../../elastic/product/ElasticProductService";
import { SearchProductsInput } from "../../resolvers-types.generated";

const searchProducts = async (
    parent: any,
    { data }: { data: SearchProductsInput },
    context: any
  ) => {
    try {
      const results = await ElasticProductService.productAutoComplete(data.searchText);
      const matches = results.map((result) => (result._source as any).product as String)
      return matches;
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  };
  
  export default {
    Query: { searchProducts },
  };