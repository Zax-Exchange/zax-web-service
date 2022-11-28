import { purchase_orders } from "../../../../models/purchase_orders";
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
  console.log(data);
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
        url: poFile.url,
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
