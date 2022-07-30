import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

export default class ElasticCompanyService {
  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      await elasticClient.indices.delete({ index: "vendor" })
      const exist = await elasticClient.indices.exists({ index: "vendor" });

      if (!exist) {
        await elasticClient.indices.create({
          "index": "vendor",
          mappings: {
            "properties": {
              id: { type: "text" },
              moqMin: { type: "integer" },
              moqMax: { type: "integer" },
              locations: { type: "text" },
              leadTime: { type: "integer" },
              materials: { type: "text" }
            },
          }
        });
      }
  
      const { id, moq, locations, leadTime, materials } = data;
      const moqMin = moq.split("-")[0];
      const moqMax = moq.split("-")[1];
      await elasticClient.index({
        index: "vendor",
        id,
        document: {
          moqMin,
          moqMax,
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
        id,
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