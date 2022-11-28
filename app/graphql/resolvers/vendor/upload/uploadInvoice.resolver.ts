import { v4 as uuidv4 } from "uuid";
import s3 from "../../../../aws/s3";
import sequelize from "../../../../postgres/dbconnection";
import { Invoice, InvoiceStatus } from "../../../resolvers-types.generated";

const uploadInvoice = async (_parent: any, { file }: any) => {
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
          process.env.AWS_S3_INVOICES_FOLDER
        }`,
      })
      .promise();
    await sequelize.models.invoices.create({
      id: fileId,
      fileName: filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_INVOICES_FOLDER}/${fileId}`,
      status: InvoiceStatus.Open,
    });

    return {
      fileId,
      filename,
      url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_INVOICES_FOLDER}/${fileId}`,
      status: InvoiceStatus.Open,
    } as Invoice;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    uploadInvoice,
  },
};
