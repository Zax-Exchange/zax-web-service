import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteProductImagesInput } from "../../../resolvers-types.generated";

export const deleteProductImages = async (
  _parent: any,
  { data }: { data: DeleteProductImagesInput }
) => {
  try {
    const { fileIds } = data;

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        fileIds.map((fileId) => {
          return sequelize.models.vendor_product_images.destroy({
            where: {
              id: fileId,
            },
          });
        })
      );
      await Promise.all(
        fileIds.map((fileId) => {
          return s3
            .deleteObject({
              Bucket: `${process.env.AWS_S3_VENDOR_FILES_BUCKET!}/${
                process.env.AWS_S3_SHOWCASE_FOLDER
              }`,
              Key: fileId,
            })
            .promise();
        })
      );
    });

    return true;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    deleteProductImages,
  },
};
