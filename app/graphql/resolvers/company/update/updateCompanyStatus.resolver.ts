import sequelize from "../../../../postgres/dbconnection";
import { UpdateCompanyStatusInput } from "../../../resolvers-types.generated";

const updateCompanyStatus = async (
  parents: any,
  { data }: { data: UpdateCompanyStatusInput },
  context: any
) => {
  const { companyId, isActive } = data;
  try {
    const company = await sequelize.models.companies.findByPk(companyId);
    await company?.update({
      isActive,
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    updateCompanyStatus,
  },
};
