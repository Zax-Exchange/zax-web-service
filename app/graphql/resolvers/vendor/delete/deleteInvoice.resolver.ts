import s3 from "../../../../aws/s3";
import { invoices } from "../../../../models/invoices";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeleteInvoiceInput } from "../../../resolvers-types.generated";

export const deleteInvoice = async (
  _parent: any,
  { data }: { data: DeleteInvoiceInput }
) => {
  try {
    const { fileId } = data;

    const valueToDelete = (await sequelize.models.invoices.findByPk(
      fileId
    )) as invoices | null;
    await sequelize.models.invoices.destroy({
      where: {
        id: fileId,
      },
    });

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_S3_CUSTOMER_FILES_BUCKET!}/${
          process.env.AWS_S3_INVOICES_FOLDER
        }`,
        Key: fileId,
      })
      .promise();

    if (valueToDelete !== null && valueToDelete.projectId !== null) {
      await cacheService.invalidateProjectInCache(valueToDelete.projectId!);
    }
    return true;
  } catch (error: any) {
    throw error;
  }
};

export default {
  Mutation: {
    deleteInvoice,
  },
};
