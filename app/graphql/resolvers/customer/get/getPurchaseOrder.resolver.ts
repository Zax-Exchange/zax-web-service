import { purchase_orders } from "../../../../db/models/purchase_orders";
import sequelize from "../../../../postgres/dbconnection";

import {
  GetPurchaseOrderInput,
  PurchaseOrder,
} from "../../../resolvers-types.generated";

const getPurchaseOrder = async (
  parent: any,
  { data }: { data: GetPurchaseOrderInput },
  context: any
): Promise<PurchaseOrder | null> => {
  const { projectId, projectBidId } = data;

  try {
    const poFile = (await sequelize.models.purchase_orders.findOne({
      where: {
        projectId,
        projectBidId,
      },
    })) as purchase_orders;

    if (poFile) {
      return {
        fileId: poFile.id,
        filename: poFile.fileName,
        url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_PURCHASE_ORDERS_FOLDER}/${poFile.id}`,
        status: poFile.status,
      };
    }
    return null;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getPurchaseOrder,
  },
};
