import sequelize from "../../../../postgres/dbconnection";
import { CreateProductImagesInput } from "../../../resolvers-types.generated";

const createProductImages = async (
  parent: any,
  { data }: { data: CreateProductImagesInput },
  context: any,
  info: any
) => {
  try {
    const { companyId, fileIds, productType } = data;

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        fileIds.map((id) => {
          return sequelize.models.vendor_product_images.update(
            {
              companyId,
              productType,
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
    createProductImages,
  },
};
