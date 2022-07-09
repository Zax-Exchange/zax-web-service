import elasticClient from "../elasticConnection";
import * as projectTypes from "../types/project";

export default class ElasticProjectService {
  static async createProjectDocument(data: projectTypes.ProjectDocument) {
    const {
      projectId,
      deliveryLocation,
      deliveryDate,
      budget,
      materials
    } = data
    const exist = await elasticClient.indices.exists({ index: "project" }).catch(e => console.error(e));

    await elasticClient.indices.create({
      "index": "project",
      mappings: {
        "properties": {
          id: { type: "text" },
          deliveryDate: { type: "date" },
          deliveryLocation: { type: "text"},
          budget: { type: "integer" },
          materials: { type: "text" }
        },
      }
    }).catch(e => console.error(e))
    if (!exist) {
    }

    await elasticClient.index({
      index: "project",
      id: projectId.toString(),
      document: {
        deliveryLocation,
        deliveryDate,
        budget,
        materials
      },
      refresh: true
    })
    .catch(e => console.error(e));
  }

  static async updateProjectDocument(data: projectTypes.ProjectDocument) {
    const {
      projectId,
      deliveryLocation,
      deliveryDate,
      budget,
      materials
    } = data;
    await elasticClient.update({
      index: "project",
      id: projectId.toString(),
      doc: {
        deliveryLocation,
        deliveryDate,
        budget,
        materials
      },
    }).catch(e => console.error(e));
  }

  static async searchProjectDocuments(query: string) {
    return await elasticClient.search({
      "index": "project",
      "query": {
        "query_string": {
          query
        }
        
      
      }
    }).then((res) => {
      return res.hits.hits;
    }).catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
  }
}