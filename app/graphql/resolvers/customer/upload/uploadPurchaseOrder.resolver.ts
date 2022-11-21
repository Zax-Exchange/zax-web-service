import { v4 as uuidv4 } from "uuid";
import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import {
  PurchaseOrder,
  PurchaseOrderStatus,
} from "../../../resolvers-types.generated";

const uploadPurchaseOrder = async (_parent: any, { file }: any) => {
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
        Bucket: `${process.env.AWS_S3_CUSTOMER_FILES_BUCKET!}/${
          process.env.AWS_S3_PURCHASE_ORDERS_FOLDER
        }`,
      })
      .promise();
    await sequelize.models.purchase_orders.create({
      id: fileId,
      fileName: filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_PURCHASE_ORDERS_FOLDER}/${fileId}`,
      status: PurchaseOrderStatus.Open,
    });

    return {
      fileId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_PURCHASE_ORDERS_FOLDER}/${fileId}`,
      status: PurchaseOrderStatus.Open,
    } as PurchaseOrder;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    uploadPurchaseOrder,
  },
};
