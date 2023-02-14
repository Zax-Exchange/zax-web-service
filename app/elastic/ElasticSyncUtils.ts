import ElasticCategoryService from "./category/ElasticCategoryService";
import ElasticCompanyService from "./company/ElasticCompanyService";
import ElasticProductService from "./product/ElasticProductService";
import ElasticProjectService from "./project/ElasticProjectService";

export const syncElasticWithDB = async() => {
  try {
    await ElasticProductService.syncProductsWithES();
    console.log("product names synced with ES");
  } catch (error) {
    console.error("Unable to sync products with ES:", error)
  }

  try {
    await ElasticCategoryService.syncCategoriesWithES();
    console.log("categories synced with ES");
  } catch (error) {
    console.error("Unable to sync categories with ES:", error)
  }

  try {
    await ElasticCompanyService.syncVendorsWithES();
    console.log("vendors synced with ES");
  } catch (error) {
    console.error("Unable to sync vendors with ES:", error)
  }

  try {
    await ElasticProjectService.syncProjectsWithES();
    console.log("projects synced with ES");
  } catch (error) {
    console.error("Unable to sync projects with ES:", error)
  }
}