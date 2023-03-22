import { v4 as uuidv4 } from "uuid";
import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";

const uploadCertification = async (_parent: any, { file }: any) => {
  try {
    const resolvedFile = await file;
    const { createReadStream, filename, mimetype, encoding } =
      resolvedFile.file;
    const stream = createReadStream();
    const fileId = uuidv4();
    await s3
      .upload({
        Body: stream,
        Key: fileId,
        ContentType: mimetype,
        Bucket: `${process.env.AWS_S3_VENDOR_FILES_BUCKET!}/${
          process.env.AWS_S3_CERT_FOLDER
        }`,
      })
      .promise();
    await sequelize.models.vendor_certifications.create({
      id: fileId,
      fileName: filename,
    });

    return {
      fileId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_CERT_FOLDER}/${fileId}`,
    };
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    uploadCertification,
  },
};
