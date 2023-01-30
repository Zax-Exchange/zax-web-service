import ElasticCompanyService from "../../../../elastic/company/ElasticCompanyService";
import sequelize from "../../../../postgres/dbconnection";
import { UpdateVendorInfoInput } from "../../../resolvers-types.generated";

const updateVendorInfo = async (
  parents: any,
  { data }: { data: UpdateVendorInfoInput },
  context: any
) => {
  const companies = sequelize.models.companies;
  const vendors = sequelize.models.vendors;

  try {
    const {
      companyId,
      name,
      contactEmail,
      logo,
      phone,
      fax,
      companyUrl,
      country,
      leadTime,
      locations,
      productsAndMoq,
    } = data;

    await sequelize.transaction(async (transaction) => {
      await companies.update(
        {
          name,
          contactEmail,
          logo,
          phone,
          fax,
          companyUrl,
          country,
        },
        {
          where: {
            id: companyId,
          },
          transaction,
        }
      );

      await vendors.update(
        {
          leadTime,
          locations,
          productsAndMoq: JSON.stringify(productsAndMoq),
        },
        {
          where: {
            companyId,
          },
          transaction,
        }
      );
    });

    if (leadTime && locations && country) {
      ElasticCompanyService.updateVendorDocument({
        id: companyId,
        name,
        country,
        leadTime,
        locations,
        products: productsAndMoq.map((productAndMoq) => productAndMoq.product),
      });
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateVendorInfo,
  },
};
