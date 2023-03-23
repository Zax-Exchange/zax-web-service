import sequelize from "../../../../postgres/dbconnection";
import { CreateCertificationsInput } from "../../../resolvers-types.generated";

const createCertifications = async (
  parent: any,
  { data }: { data: CreateCertificationsInput },
  context: any,
  info: any
) => {
  try {
    const { companyId, fileIds } = data;

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        fileIds.map((id) => {
          return sequelize.models.vendor_certifications.update(
            {
              companyId,
            },
            { where: { id }, transaction }
          );
        })
      );
    });

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createCertifications,
  },
};
