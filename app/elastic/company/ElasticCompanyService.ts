import { companiesAttributes } from "../../db/models/companies";
import { vendorsAttributes } from "../../db/models/vendors";
import { FactoryProductDetail } from "../../graphql/resolvers-types.generated";
import sequelize from "../../postgres/dbconnection";
import CompanyApiUtils from "../../utils/companyUtils";
import elasticClient from "../elasticConnection";
import * as companyTypes from "../types/company";

const VENDOR_INDEX_NAME = "vendor";
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
          products: { type: "search_as_you_type" },
        },
      },
    });
  }

  static async createVendorDocument(data: companyTypes.VendorDocument) {
    try {
      // await elasticClient.indices.delete({ index: "vendor" });
      const exist = await elasticClient.indices.exists({
        index: VENDOR_INDEX_NAME,
      });

      if (!exist) {
        await this.createVendorIndex();
      }

      const { id, name, locations, products, country } = data;

      await elasticClient.index({
        index: VENDOR_INDEX_NAME,
        id,
        document: {
          name,
          country,
          locations,
          products,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async updateVendorDocument(
    input: companyTypes.UpdateVendorDocumentInput
  ) {
    try {
      const { id, data } = input;

      await elasticClient.update({
        index: VENDOR_INDEX_NAME,
        id,
        doc: {
          ...data,
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
          },
        },
      })
      .then((res) => {
        return res.hits.hits;
      })
      .catch((e) => {
        console.error(e);
        return Promise.reject(e);
      });
  }

  static extractAllFactoryDetails(vendors: vendorsAttributes[]) {
    return vendors.map((vendor) => {
      const productsDetail = JSON.parse(vendor.factoryProductsDetail) as {
        product: string;
        moq: string;
        leadTime: string;
      }[];
      return {
        productsDetail,
        location: vendor.location,
      };
    });
  }

  static combineFactoryProducts(productsDetails: FactoryProductDetail[][]) {
    const res: Set<string> = new Set();
    productsDetails.forEach((p) =>
      p.forEach((detail) => res.add(detail.product))
    );
    return Array.from(res);
  }

  static async syncVendorsWithES() {
    try {
      const exist = await elasticClient.indices.exists({
        index: VENDOR_INDEX_NAME,
      });
      if (!exist) {
        await this.createVendorIndex();
      } else {
        await elasticClient.deleteByQuery({
          index: VENDOR_INDEX_NAME,
          body: {
            query: {
              match_all: {},
            },
          },
        });
      }

      const syncJobs: Promise<any>[] = [];

      const allVendorCompanies = await sequelize.models.companies.findAll({
        where: {
          isVendor: true,
        },
      });

      for (const item of allVendorCompanies) {
        const vendorCompany = item.get({ plain: true }) as companiesAttributes;
        const vendors = await sequelize.models.vendors
          .findAll({
            where: {
              companyId: vendorCompany.id,
            },
          })
          .then((vs) =>
            vs.map((v) => v.get({ plain: true }) as vendorsAttributes)
          );

        const factoriesDetails = this.extractAllFactoryDetails(vendors);

        const products: string[] = this.combineFactoryProducts(
          factoriesDetails.map((fact) => {
            return fact.productsDetail;
          })
        );

        syncJobs.push(
          elasticClient.index({
            index: VENDOR_INDEX_NAME,
            id: vendorCompany.id,
            document: {
              name: vendorCompany.name,
              country: vendorCompany.country,
              locations: factoriesDetails.map((fact) => fact.location),
              products,
            },
          })
        );
      }
      await Promise.all(syncJobs);
    } catch (error) {
      console.log(error);
    }
  }
}
