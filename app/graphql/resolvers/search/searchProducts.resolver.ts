import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import ElasticProductService from "../../../elastic/product/ElasticProductService";
import { SearchProductsInput } from "../../resolvers-types.generated";

const searchProducts = async (
    parent: any,
    { data }: { data: SearchProductsInput },
    context: any
  ) => {
    try {
      const allResults: SearchHit<any>[] = [];
      var results = await ElasticProductService.productAutoComplete(data.searchText);
      while(results.length > 0) {
        allResults.push(...results);
        results = await ElasticProductService.productAutoComplete(data.searchText, allResults.length)
      }
      return allResults.map((result) => (result._source as any).product as string);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  };
  
  export default {
    Query: { searchProducts },
  };