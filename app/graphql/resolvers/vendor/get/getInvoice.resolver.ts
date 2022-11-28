import { invoices } from "../../../../models/invoices";
import { purchase_orders } from "../../../../models/purchase_orders";
import sequelize from "../../../../postgres/dbconnection";

import { GetInvoiceInput, Invoice } from "../../../resolvers-types.generated";

const getInvoice = async (
  parent: any,
  { data }: { data: GetInvoiceInput },
  context: any
): Promise<Invoice | null> => {
  const { projectId, projectBidId } = data;

  try {
    const invoiceFile = (await sequelize.models.invoices.findOne({
      where: {
        projectId,
        projectBidId,
      },
    })) as invoices;

    if (invoiceFile) {
      return {
        fileId: invoiceFile.id,
        filename: invoiceFile.fileName,
        url: invoiceFile.url,
        status: invoiceFile.status,
      };
    }
    return null;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getInvoice,
  },
};
