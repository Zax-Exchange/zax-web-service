import { v4 as uuidv4 } from "uuid";
import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { BidRemark } from "../../../resolvers-types.generated";

const uploadBidRemark = async (_parent: any, { file }: any) => {
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
          process.env.AWS_S3_BID_REMARKS_FOLDER
        }`,
      })
      .promise();

    await sequelize.models.bid_remarks.create({
      id: fileId,
      fileName: filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_BID_REMARKS_FOLDER}/${fileId}`,
    });

    return {
      fileId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_BID_REMARKS_FOLDER}/${fileId}`,
    } as BidRemark;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    uploadBidRemark,
  },
};
