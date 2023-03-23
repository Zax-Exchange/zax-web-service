import { vendorsAttributes } from "../../../../db/models/vendors";
import ElasticCompanyService from "../../../../elastic/company/ElasticCompanyService";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteFactoryInput } from "../../../resolvers-types.generated";

const deleteFactory = async (
  parent: any,
  { data }: { data: DeleteFactoryInput },
  context: any
) => {
  try {
    const { id, companyId } = data;
    await sequelize.models.vendors.destroy({
      where: {
        id,
      },
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
    deleteFactory,
  },
};
