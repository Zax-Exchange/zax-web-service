import { vendorsAttributes } from "../../../../db/models/vendors";
import ElasticCompanyService from "../../../../elastic/company/ElasticCompanyService";
import sequelize from "../../../../postgres/dbconnection";
import { CreateFactoryInput } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

const createFactory = async (
  parent: any,
  { data }: { data: CreateFactoryInput },
  context: any,
  info: any
) => {
  try {
    const { companyId, location, factoryProductsDetail } = data;
    await sequelize.models.vendors.create({
      id: uuidv4(),
      companyId,
      location,
      factoryProductsDetail: JSON.stringify(factoryProductsDetail),
    });
    const factories = await sequelize.models.vendors
      .findAll({
        where: {
          companyId,
        },
      })
      .then((vendors) =>
        vendors.map((v) => v.get({ plain: true }) as vendorsAttributes)
      );

    ElasticCompanyService.updateVendorDocument({
      id: companyId,
      data: {
        locations: Array.from(new Set(factories.map((f) => f.location))),
        products: ElasticCompanyService.combineFactoryProducts(
          factories.map((f) => JSON.parse(f.factoryProductsDetail))
        ),
      },
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createFactory,
  },
};
