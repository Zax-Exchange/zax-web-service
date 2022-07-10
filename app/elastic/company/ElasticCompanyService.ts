import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

export default class ElasticCompanyService {
  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      await elasticClient.indices.delete({
        "index": "vendor"
      });
      const exist = await elasticClient.indices.exists({ index: "vendor" });;
      if (!exist) {
        await elasticClient.indices.create({
          "index": "vendor",
          mappings: {
            "properties": {
              id: { type: "text" },
              name: { type:"text" },
              moq: { type: "integer" },
              locations: { type: "text"},
              leadTime: { type: "integer" },
            },
          }
        });
      }
  
      const { companyId, name, moq, locations, leadTime } = data;
      await elasticClient.index({
        index: "vendor",
        id: companyId.toString(),
        document: {
          name,
          moq: moq ? moq : "NULL",
          locations: locations? locations : "NULL",
          leadTime: leadTime? leadTime : "NULL"
        }
      });
    } catch(e) {
      console.error(e);
    }
  }
}