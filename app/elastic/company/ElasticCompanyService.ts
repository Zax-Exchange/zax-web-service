import { vendorsAttributes } from "../../models/vendors";
import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../../utils/companyUtils";
import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

const VENDOR_INDEX_NAME = "vendor"
export default class ElasticCompanyService {
  static async createVendorIndex() {
    return elasticClient.indices.create({
      index: VENDOR_INDEX_NAME,
      mappings: {
        properties: {
          id: { type: "text" },
          name: { type: "search_as_you_type" },
          country: { type: "text" },
          locations: { type: "text" },
          leadTime: { type: "integer" },
          products: { type: "search_as_you_type" },
        },
      },
    });
  }

  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      // await elasticClient.indices.delete({ index: "vendor" });
      const exist = await elasticClient.indices.exists({ index: VENDOR_INDEX_NAME });

      if (!exist) {
        await this.createVendorIndex();
      }

      const { id, name, locations, leadTime, products, country } = data;

      await elasticClient.index({
        index: VENDOR_INDEX_NAME,
        id,
        document: {
          name,
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
      const { id, name, locations, leadTime, products } = data;

      await elasticClient.update({
        index: VENDOR_INDEX_NAME,
        id,
        doc: {
          name,
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
        highlight: {
          fields: {
            name: {},
            products: {},
          }
        }
      })
      .then((res) => {
        return res.hits.hits;
      })
      .catch((e) => {
        console.error(e);
        return Promise.reject(e);
      });
  }

  static async syncVendorsWithES() {
    try {
      const exist = await elasticClient.indices.exists({ index: VENDOR_INDEX_NAME });
      if (!exist) {
        await this.createVendorIndex();
      } else {
        await elasticClient.deleteByQuery({
          index: VENDOR_INDEX_NAME,
          body: {
            query: {
              match_all: {}
            }
          }
        });
      }
  
      const syncJobs: Promise<any>[] = [];
      const res = await sequelize.models.vendors.findAll();
      for (const item of res) {
        const vendor = item.get({ plain: true }) as vendorsAttributes;
        if (vendor) {
          const productsAndMoq = JSON.parse(vendor.productsAndMoq) as {product: string, moq: string}[];
          const products: string[] = productsAndMoq.map((it) => it.product);
          const company = await CompanyApiUtils.getCompanyWithCompanyId(vendor.companyId);
          syncJobs.push(elasticClient.index({
            index: VENDOR_INDEX_NAME,
            id: vendor.id,
            document: {
              name: company.name,
              country: company.country,
              locations: vendor.locations,
              leadTime: vendor.leadTime,
              products,
            }
          }));
        }        
      }
      await Promise.all(syncJobs);      
    } catch (error) {
      console.log(error);
    }
  }
}
