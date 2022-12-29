import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

export default class ElasticCompanyService {
  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      // await elasticClient.indices.delete({ index: "vendor" });
      const exist = await elasticClient.indices.exists({ index: "vendor" });

      if (!exist) {
        await elasticClient.indices.create({
          index: "vendor",
          mappings: {
            properties: {
              id: { type: "text" },
              country: { type: "text" },
              locations: { type: "text" },
              leadTime: { type: "integer" },
              products: { type: "text" },
            },
          },
        });
      }

      const { id, locations, leadTime, products, country } = data;

      await elasticClient.index({
        index: "vendor",
        id,
        document: {
          country,
          locations,
          leadTime,
          products,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async updateVendorDocument(data: companyTypes.VendorDocument) {
    try {
      const { id, locations, leadTime, products } = data;

      await elasticClient.update({
        index: "vendor",
        id,
        doc: {
          locations,
          leadTime,
          products,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async searchVendorDocuments(query: any) {
    return await elasticClient
      .search({
        index: "vendor",
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
