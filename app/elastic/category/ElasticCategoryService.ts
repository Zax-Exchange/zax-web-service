import { getAllCategories } from "../../graphql/resolvers/category/get/getAllCategories.resolver";
import elasticClient from "../elasticConnection"
import { DEFAULT_SEARCH_START_INDEX, DEFAULT_PAGE_SIZE } from "../ElasticSearchUtils";

const CATEGORY_INDEX = "categories"

export default class ElasticCategoryService {
	static async syncCategoriesWithES() {
		try {
			const existingIndex = await elasticClient.indices.exists({ index: CATEGORY_INDEX });
			if (!existingIndex) {
				// TODO: create index with alias
				await elasticClient.indices.create({
					index: CATEGORY_INDEX,
					mappings: {
						properties: {
							name: { type: "search_as_you_type" },
              parent: { type: "text" },
              children: { type: "text" },
						}
					}
				});
			}
			await elasticClient.deleteByQuery({
				index: CATEGORY_INDEX,
				body: {
					query: {
						match_all: {}
					}
				}
			})
			
			const syncJobs: Promise<any>[] = [];
			for (const category of getAllCategories()) {
				syncJobs.push(elasticClient.index({
					index: CATEGORY_INDEX,
					document: {
						name: category.name,
            parent: category.parent,
            children: category.children
					},
					refresh: true
				}));
			}
			await Promise.all(syncJobs)	
		} catch (error) {
			console.log(error)
		}
	}

	static async categoryAutoComplete(
    searchText: string, 
    from: number = DEFAULT_SEARCH_START_INDEX, 
    size: number = DEFAULT_PAGE_SIZE
  ) {
    return await elasticClient.search({
      index: CATEGORY_INDEX,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: searchText,
                type: "bool_prefix",
                fields: [
                  "name",
                  "name._2gram",
                  "name._3gram",
                  "name._index_prefix"
                ]
              }
            },
            {
              multi_match: {
                query: searchText,
                fuzziness: 2,
                fields: [
                  "name",
                  "name._2gram",
                  "name._3gram",
                  "name._index_prefix"
                ]
              }
            }
          ]
        }
      },
      from,
      size
    })
    .then((res) => {
      return res.hits.hits;
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    })
  }
}