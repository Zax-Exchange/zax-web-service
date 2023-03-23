import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteCertificationsInput } from "../../../resolvers-types.generated";

export const deleteCertifications = async (
  _parent: any,
  { data }: { data: DeleteCertificationsInput }
) => {
  try {
    const { fileIds } = data;

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        fileIds.map((fileId) => {
          return sequelize.models.vendor_certifications.destroy({
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
                process.env.AWS_S3_CERT_FOLDER
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
    deleteCertifications,
  },
};
