import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";
import * as companyTypes from "../types/company";

export default class ElasticProjectService {
  static async createProjectDocument(data: projectTypes.ProjectDocument) {
    const {
      projectId,
      deliveryCountry,
      deliveryCity,
      deliveryDate,
      budget,
      materials
    } = data

    try {
      // await elasticClient.indices.delete({ index: "project" });
      const exist = await elasticClient.indices.exists({ index: "project" });
      
     
      if (!exist) {
        await elasticClient.indices.create({
          "index": "project",
          mappings: {
            "properties": {
              id: { type: "text" },
              deliveryDate: { type: "date" },
              deliveryCountry: { type: "text" },
              deliveryCity: { type: "text"},
              budget: { type: "integer" },
              materials: { type: "text" },
              deleted: { type: "boolean" }
            },
          }
        });
      }
      await elasticClient.index({
        index: "project",
        id: projectId,
        document: {
          deliveryCountry,
          deliveryCity,
          deliveryDate,
          budget,
          materials,
          deleted: false
        },
        refresh: true
      })
    } catch(e) {
      console.error(e);
    }
 
  }

  static async updateProjectDocument(data: projectTypes.ProjectDocument) {
    const {
      projectId,
      deliveryCountry,
      deliveryCity,
      deliveryDate,
      budget,
      materials
    } = data;
    await elasticClient.update({
      index: "project",
      id: projectId,
      doc: {
        deliveryCountry,
        deliveryCity,
        deliveryDate,
        budget,
        materials
      },
    }).catch(e => console.error(e));
  }

  static async deleteProjectDocument(id: string) {
    await elasticClient.update({
      index: "project",
      id,
      doc: {
        deleted: true
      },
    }).catch(e => console.error(e));
  }

  static async searchProjectDocuments(query: any) {
    return await elasticClient.search({
      "index": "project",
      "query": query
    }).then((res) => {
      return res.hits.hits;
    }).catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
  }
}