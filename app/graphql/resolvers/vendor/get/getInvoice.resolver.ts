import { invoices } from "../../../../db/models/invoices";
import { purchase_orders } from "../../../../db/models/purchase_orders";
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
        url: `${process.env.AWS_CDN_URL}/${process.env.AWS_S3_INVOICES_FOLDER}/${invoiceFile.id}`,
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
