import { UpdateCustomerInput } from "../../graphql/resolvers-types.generated";
import sequelize from "../../postgres/dbconnection";

const updateCustomer = async (data: UpdateCustomerInput) => {
  const companies = sequelize.models.companies;
  const id = data.id;
  const { name, contactEmail, logo, phone, fax, companyUrl, country } =
    data.data;

  try {
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
      }
    );
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export { updateCustomer };
