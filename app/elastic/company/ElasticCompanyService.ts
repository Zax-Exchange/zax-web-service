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
              moqMin: { type: "integer" },
              moqMax: { type: "integer" },
              country: { type: "text" },
              locations: { type: "text" },
              leadTime: { type: "integer" },
              products: { type: "text" },
            },
          },
        });
      }

      const { id, moq, locations, leadTime, products, country } = data;
      const moqMin = moq.split("-")[0];
      const moqMax = moq.split("-")[1];
      await elasticClient.index({
        index: "vendor",
        id,
        document: {
          moqMin,
          moqMax,
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
      const { id, moq, locations, leadTime, products } = data;
      const moqMin = moq.split("-")[0];
      const moqMax = moq.split("-")[1];
      await elasticClient.update({
        index: "vendor",
        id,
        doc: {
          moqMin,
          moqMax,
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
