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
              materials: { type: "text" }
            },
          }
        });
      }
      await elasticClient.index({
        index: "project",
        id: projectId.toString(),
        document: {
          deliveryCountry,
          deliveryCity,
          deliveryDate,
          budget,
          materials
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
      id: projectId.toString(),
      doc: {
        deliveryCountry,
        deliveryCity,
        deliveryDate,
        budget,
        materials
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