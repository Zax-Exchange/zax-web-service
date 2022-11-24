import {
  INVOICE_CREATE_ROUTE,
  PO_CREATE_ROUTE,
} from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CreateInvoiceInput,
  CreatePurchaseOrderInput,
} from "../../../resolvers-types.generated";

const createPurchaseOrder = async (
  parent: any,
  { data }: { data: CreatePurchaseOrderInput },
  context: any,
  info: any
) => {
  try {
    const { purchaseOrderId, projectBidId, projectId } = data;

    // if there is an existing PO, we delete it first
    await sequelize.models.purchase_orders.destroy({
      where: {
        projectId,
        projectBidId,
      },
    });

    const [_, projectInstance, projectUsers] = await Promise.all([
      sequelize.models.purchase_orders.update(
        {
          projectId,
          projectBidId,
        },
        {
          where: {
            id: purchaseOrderId,
          },
        }
      ),
      ProjectApiUtils.getProjectInstance(projectId),
      ProjectApiUtils.getProjectBidUsers(projectBidId),
    ]);
    console.log(_);
    NotificationService.sendNotification(PO_CREATE_ROUTE, {
      data: {
        message: `A purchase order has been created for ${projectInstance?.name}`,
        projectId,
      },
      receivers: projectUsers.map((u) => u.userId),
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createPurchaseOrder,
  },
};