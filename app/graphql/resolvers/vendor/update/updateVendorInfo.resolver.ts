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
    });

    ElasticCompanyService.updateVendorDocument({
      id: companyId,
      data: {
        country,
      },
    });
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
