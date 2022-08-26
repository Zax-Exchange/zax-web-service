import sequelize from "../../../../postgres/dbconnection";
import { UpdateCustomerInfoInput } from "../../../resolvers-types.generated";

const updateCustomerInfo = async (
  parents: any,
  { data }: { data: UpdateCustomerInfoInput },
  context: any
) => {
  const companies = sequelize.models.companies;

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
          id: companyId,
        },
      }
    );
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateCustomerInfo,
  },
};
