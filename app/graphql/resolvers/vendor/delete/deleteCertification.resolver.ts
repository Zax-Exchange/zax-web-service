import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { DeleteCertificationInput } from "../../../resolvers-types.generated";

export const deleteCertification = async (
  _parent: any,
  { data }: { data: DeleteCertificationInput }
) => {
  try {
    const { fileId } = data;

    await sequelize.models.vendor_certifications.destroy({
      where: {
        id: fileId,
      },
    });

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_S3_VENDOR_FILES_BUCKET!}/${
          process.env.AWS_S3_CERT_FOLDER
        }`,
        Key: fileId,
      })
      .promise();

    return true;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    deleteCertification,
  },
};
