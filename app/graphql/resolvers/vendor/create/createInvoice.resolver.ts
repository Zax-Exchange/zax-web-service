import { INVOICE_CREATE_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import { CreateInvoiceInput } from "../../../resolvers-types.generated";

const createInvoice = async (
  parent: any,
  { data }: { data: CreateInvoiceInput },
  context: any,
  info: any
) => {
  try {
    const { invoiceId, projectBidId, projectId } = data;
    // if there is an existing invoice, we delete it first
    await sequelize.models.invoices.destroy({
      where: {
        projectId,
        projectBidId,
      },
    });

    const [_, projectInstance, projectUsers] = await Promise.all([
      sequelize.models.invoices.update(
        {
          projectId,
          projectBidId,
        },
        {
          where: {
            id: invoiceId,
          },
        }
      ),
      ProjectApiUtils.getProjectInstance(projectId),
      ProjectApiUtils.getProjectUsers(projectId),
    ]);

    NotificationService.sendNotification(INVOICE_CREATE_ROUTE, {
      data: {
        message: `app.notification.poInvoice.invoiceCreate`,
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
    createInvoice,
  },
};
