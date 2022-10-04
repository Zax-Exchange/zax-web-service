import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";
import * as companyTypes from "../types/company";
import sequelize from "../../postgres/dbconnection";
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
      deliveryDate,
      targetPrice,
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
              category: { type: "text" },
              deliveryDate: { type: "date" },
              deliveryAddress: { type: "text" },
              targetPrice: { type: "integer" },
              products: { type: "text" },
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
          deliveryDate,
          targetPrice,
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
    data: projectTypes.updateProjectDocumentWithProjectSpecInput
  ) {
    const { projectId, deliveryAddress, deliveryDate, targetPrice, category } =
      data;
    await elasticClient
      .update({
        index: "project",
        id: projectId,
        doc: {
          category,
          deliveryAddress,
          deliveryDate,
          targetPrice,
        },
      })
      .catch((e) => console.error(e));
  }

  // Updates project document with updated products list
  static async updateProjectDocumentProducts(
    data: projectTypes.updateProjectDocumentProductsInput
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
