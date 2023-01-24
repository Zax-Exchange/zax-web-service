import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";
import UserApiUtils from "../../utils/userUtils";
import CompanyApiUtils from "../../utils/companyUtils";

export default class ElasticProjectService {
  static async createProjectDocument(
    data: projectTypes.CreateProjectDocumentInput
  ) {
    const {
      userId,
      projectId,
      category,
      deliveryAddress,
      country,
      deliveryDate,
      targetPrice,
      orderQuantities,
      products,
    } = data;

    try {
      // await elasticClient.indices.delete({ index: "project" });
      const exist = await elasticClient.indices.exists({ index: "project" });

      const companyId = await UserApiUtils.getUserCompanyId(userId);
      const company = await CompanyApiUtils.getCompanyWithCompanyId(companyId);

      if (!exist) {
        await elasticClient.indices.create({
          index: "project",
          mappings: {
            properties: {
              id: { type: "text" },
              companyName: { type: "text" },
              category: { type: "search_as_you_type" },
              deliveryDate: { type: "date" },
              deliveryAddress: { type: "text" },
              country: { type: "text" },
              targetPrice: { type: "float" },
              orderQuantities: { type: "integer" },
              products: { type: "search_as_you_type" },
              deleted: { type: "boolean" },
            },
          },
        });
      }
      await elasticClient.index({
        index: "project",
        id: projectId,
        document: {
          companyName: company.name,
          category,
          deliveryAddress,
          country,
          deliveryDate,
          targetPrice,
          orderQuantities,
          products,
          deleted: false,
        },
        refresh: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Updates project spec, without updating components (products)
  static async updateProjectDocumentWithProjectSpec(
    data: projectTypes.UpdateProjectDocumentWithProjectSpecInput
  ) {
    const { projectId, deliveryAddress, country, deliveryDate, targetPrice, orderQuantities, category } =
      data;
    await elasticClient
      .update({
        index: "project",
        id: projectId,
        doc: {
          category,
          deliveryAddress,
          country,
          deliveryDate,
          targetPrice,
          orderQuantities
        },
      })
      .catch((e) => {
        console.error(e)
      });
  }

  // Updates project document with updated products list
  static async updateProjectDocumentProducts(
    data: projectTypes.UpdateProjectDocumentProductsInput
  ) {
    const { products, projectId } = data;

    try {
      await elasticClient.update({
        index: "project",
        id: projectId,
        doc: {
          products,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteProjectDocument(id: string) {
    await elasticClient
      .update({
        index: "project",
        id,
        doc: {
          deleted: true,
        },
      })
      .catch((e) => console.error(e));
  }

  static async searchProjectDocuments(query: any) {
    return await elasticClient
      .search({
        index: "project",
        query: query,
        highlight: {
          fields: {
            products: {},
          },
        },
      })
      .then((res) => {
        return res.hits.hits;
      })
      .catch((e) => {
        console.error(e);
        return Promise.reject(e);
      });
  }
}
