import { vendorsAttributes } from "../../../../db/models/vendors";
import ElasticCompanyService from "../../../../elastic/company/ElasticCompanyService";
import sequelize from "../../../../postgres/dbconnection";
import { UpdateFactoryInput } from "../../../resolvers-types.generated";

const updateFactory = async (
  parent: any,
  { data }: { data: UpdateFactoryInput },
  context: any
) => {
  try {
    const { id, companyId, location, factoryProductsDetail } = data;
    await sequelize.models.vendors.update(
      {
        location,
        factoryProductsDetail: JSON.stringify(factoryProductsDetail),
      },
      {
        where: {
          id,
        },
      }
    );

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
    updateFactory,
  },
};
