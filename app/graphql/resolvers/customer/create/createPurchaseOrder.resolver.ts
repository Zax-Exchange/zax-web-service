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
  InvoiceStatus,
} from "../../../resolvers-types.generated";

const createPurchaseOrder = async (
  parent: any,
  { data }: { data: CreatePurchaseOrderInput },
  context: any,
  info: any
) => {
  try {
    const { purchaseOrderId, projectBidId, projectId } = data;

    let hasExisting = false;

    // if there is an existing PO, we delete it first
    const numDeleted = await sequelize.models.purchase_orders.destroy({
      where: {
        projectId,
        projectBidId,
      },
    });

    if (numDeleted) hasExisting = true;

    const [_, _1, projectInstance, projectUsers] = await Promise.all([
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
      sequelize.models.invoices.update(
        {
          status: InvoiceStatus.Void,
        },
        {
          where: {
            projectId,
            projectBidId,
          },
        }
      ),
      ProjectApiUtils.getProjectInstance(projectId),
      ProjectApiUtils.getProjectBidUsers(projectBidId),
    ]);

    NotificationService.sendNotification(PO_CREATE_ROUTE, {
      data: {
        message: hasExisting
          ? "app.notification.poInvoice.poUpdate"
          : "app.notification.poInvoice.poCreate",
        projectName: projectInstance!.name,
        projectId: projectInstance!.id,
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
