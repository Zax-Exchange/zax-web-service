import { vendorsAttributes } from "../../../../db/models/vendors";
import sequelize from "../../../../postgres/dbconnection";
import {
  FactoryDetail,
  FactoryProductDetail,
  GetVendorFactoriesInput,
} from "../../../resolvers-types.generated";

const getVendorFactories = async (
  parent: any,
  { data }: { data: GetVendorFactoriesInput },
  context: any
): Promise<FactoryDetail[]> => {
  try {
    const { vendorCompanyId } = data;
    const factories = await sequelize.models.vendors
      .findAll({
        where: {
          companyId: vendorCompanyId,
        },
      })
      .then((factories) =>
        factories.map((f) => f.get({ plain: true }) as vendorsAttributes)
      );

    return factories.map((f) => {
      return {
        ...f,
        factoryProductsDetail: JSON.parse(
          f.factoryProductsDetail
        ) as FactoryProductDetail[],
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getVendorFactories,
  },
};
