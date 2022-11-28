import s3 from "../../../../aws/s3";
import { invoices } from "../../../../models/invoices";
import { purchase_orders } from "../../../../models/purchase_orders";
import sequelize from "../../../../postgres/dbconnection";
import cacheService from "../../../../redis/CacheService";
import { DeletePurchaseOrderInput } from "../../../resolvers-types.generated";

export const deletePurchaseOrder = async (
  _parent: any,
  { data }: { data: DeletePurchaseOrderInput }
) => {
  try {
    const { fileId } = data;

    const valueToDelete = (await sequelize.models.purchase_orders.findByPk(
      fileId
    )) as purchase_orders | null;
    await sequelize.models.purchase_orders.destroy({
      where: {
        id: fileId,
      },
    });

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_S3_CUSTOMER_FILES_BUCKET!}/${
          process.env.AWS_S3_PURCHASE_ORDERS_FOLDER
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
    deletePurchaseOrder,
  },
};
