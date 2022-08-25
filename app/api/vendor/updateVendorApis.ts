import ElasticCompanyService from "../../elastic/company/ElasticCompanyService";
import { UpdateVendorInput } from "../../graphql/resolvers-types.generated";
import sequelize from "../../postgres/dbconnection";

const updateVendor = async (data: UpdateVendorInput) => {
  const companies = sequelize.models.companies;
  const vendors = sequelize.models.vendors;

  try {
    const id = data.id;
    const { name, contactEmail, logo, phone, fax, companyUrl, country } =
      data.data;
    const { leadTime, moq, locations, materials } = data.data;

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
            id,
          },
          transaction,
        }
      );

      await vendors.update(
        {
          leadTime,
          moq,
          locations,
          materials,
        },
        {
          where: {
            companyId: id,
          },
          transaction,
        }
      );
    });

    if (leadTime && moq && locations && materials) {
      ElasticCompanyService.updateVendorDocument({
        id,
        leadTime,
        moq,
        locations,
        materials,
      });
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export { updateVendor };
