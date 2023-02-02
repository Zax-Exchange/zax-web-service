import { INVOICE_CREATE_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CreateGuestProjectInput,
  CreateGuestProjectLinkInput,
  ProjectCreationMode,
  ProjectPermission,
  ProjectStatus,
  ProjectVisibility,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import emailService from "../../../../gcp/EmailService";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";

const createGuestProjectLink = async (
  parent: any,
  { data }: { data: CreateGuestProjectLinkInput },
  context: any,
  info: any
) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { guestEmail, userId } = data;

      const projectId = uuidv4();
      const companyId = await UserApiUtils.getUserCompanyId(userId);

      const [_, company] = await Promise.all([
        sequelize.models.projects.create(
          {
            id: projectId,
            userId,
            companyId,
            creationMode: ProjectCreationMode.Advanced,
            name: "",
            category: "",
            totalWeight: "",
            deliveryDate: new Date().toISOString().split("T")[0],
            deliveryAddress: "",
            country: "",
            targetPrice: "",
            orderQuantities: [],
            status: ProjectStatus.Incomplete,
            visibility: ProjectVisibility.Private,
            guestEmail,
          },
          { transaction }
        ),
        CompanyApiUtils.getCompanyWithCompanyId(companyId),
      ]);

      await sequelize.models.project_permissions.create(
        {
          id: uuidv4(),
          userId,
          projectId,
          permission: ProjectPermission.Owner,
        },
        { transaction }
      );

      const options = {
        from: `Zax Exchange <${process.env.NODE_MAILER_USERNAME}>`,
        to: guestEmail,
        subject: "Zax Exchange Guest Project Form",
        html: `
          <p>You have an invitation from ${company.name} to create a project!</p>
          <p>Please follow the link below to complete the project form.</p>
          <a href="http://localhost:3000/guest-project/${projectId}">Click here</a>
        `,
      };

      await emailService.sendMail(options);
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    createGuestProjectLink,
  },
};
