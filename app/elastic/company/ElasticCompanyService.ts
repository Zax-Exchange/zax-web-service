import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

export default class ElasticCompanyService {
  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      
      const exist = await elasticClient.indices.exists({ index: "vendor" });
      console.log({exist})
      if (!exist) {
        await elasticClient.indices.create({
          "index": "vendor",
          mappings: {
            "properties": {
              id: { type: "text" },
              moq: { type: "integer" },
              locations: { type: "text"},
              leadTime: { type: "integer" },
              materials: { type: "text" }
            },
          }
        });
      }
  
      const { id, moq, locations, leadTime, materials } = data;
      await elasticClient.index({
        index: "vendor",
        id: id.toString(),
        document: {
          moq,
          locations,
          leadTime,
          materials
        }
      });
    } catch(e) {
      console.error(e);
    }
  }

  static async updateVendorDocument(data: companyTypes.VendorDocument) {
    try {
      const { id, moq, locations, leadTime, materials } = data;
      await elasticClient.update({
        index: "vendor",
        id: id.toString(),
        doc: {
          moq,
          locations,
          leadTime,
          materials
        }
      });
    } catch(e) {
      console.error(e);
    }
  }

  static async searchVendorDocuments(query: any) {
    return await elasticClient.search({
      "index": "vendor",
      "query": query
    }).then((res) => {
      return res.hits.hits;
    }).catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
  }
}