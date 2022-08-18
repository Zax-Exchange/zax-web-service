import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";
import * as companyTypes from "../types/company";
import sequelize from "../../postgres/dbconnection";
import UserApiUtils from "../../api/utils/userUtils";
import CompanyApiUtils from "../../api/utils/companyUtils";

export default class ElasticProjectService {
  static async createProjectDocument(
    data: projectTypes.CreateProjectDocumentInput
  ) {
    const {
      userId,
      projectId,
      deliveryAddress,
      deliveryDate,
      budget,
      materials,
    } = data;

    try {
      await elasticClient.indices.delete({ index: "project" });
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
              deliveryDate: { type: "date" },
              deliveryAddress: { type: "text" },
              budget: { type: "integer" },
              materials: { type: "text" },
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
          deliveryAddress,
          deliveryDate,
          budget,
          materials,
          deleted: false,
        },
        refresh: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async updateProjectDocument(
    data: projectTypes.UpdateProjectDocumentInput
  ) {
    const { projectId, deliveryAddress, deliveryDate, budget, materials } =
      data;
    await elasticClient
      .update({
        index: "project",
        id: projectId,
        doc: {
          deliveryAddress,
          deliveryDate,
          budget,
          materials,
        },
      })
      .catch((e) => console.error(e));
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