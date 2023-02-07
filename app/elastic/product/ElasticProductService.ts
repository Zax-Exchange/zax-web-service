import { ALL_PRODUCTS } from "../../constants/products";
import elasticClient from "../elasticConnection"
import { DEFAULT_SEARCH_START_INDEX, DEFAULT_PAGE_SIZE } from "../ElasticSearchUtils";

const PRODUCT_INDEX = "products"

export default class ElasticProductService {
	static async syncProductsWithES() {
		try {
			const existingIndex = await elasticClient.indices.exists({ index: PRODUCT_INDEX });
			if (!existingIndex) {
				// TODO: create index with alias
				await elasticClient.indices.create({
					index: PRODUCT_INDEX,
					mappings: {
						properties: {
							product: {
									type: "search_as_you_type"
							}
						}
					}
				});
			}
			await elasticClient.deleteByQuery({
				index: PRODUCT_INDEX,
				body: {
					query: {
						match_all: {}
					}
				}
			})
			
			const syncJobs: Promise<any>[] = [];
			for (const product of ALL_PRODUCTS) {
				syncJobs.push(elasticClient.index({
					index: PRODUCT_INDEX,
					document: {
						product
					},
					refresh: true
				}));
			}
			await Promise.all(syncJobs)	
		} catch (error) {
			console.log(error)
		}
	}

	static async productAutoComplete(
		searchText: string,
		from: number = DEFAULT_SEARCH_START_INDEX, 
    size: number = DEFAULT_PAGE_SIZE
	) {
		return await elasticClient.search({
			index: PRODUCT_INDEX,
			query: {
				bool: {
					should: [
						{
							multi_match: {
								query: searchText,
								type: "bool_prefix",
								fields: [
									"product",
									"product._2gram",
									"product._3gram",
									"product._index_prefix"
								]
							}
						},
						{
							multi_match: {
								query: searchText,
								fuzziness: 2,
								fields: [
									"product",
									"product._2gram",
									"product._3gram",
									"product._index_prefix"
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