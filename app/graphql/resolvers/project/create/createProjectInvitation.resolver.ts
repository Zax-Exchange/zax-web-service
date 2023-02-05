import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CreateProjectInvitationInput,
  ProjectPermission,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import NotificationService from "../../../../notification/NotificationService";
import { PROJECT_INVITATION_ROUTE } from "../../../../notification/notificationRoutes";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";
import getAllUsersWithinCompanyResolver from "../../user/get/getAllUsersWithinCompany.resolver";

// only private projects are allowed to create invitations
const createProjectInvitation = async (
  parent: any,
  { data }: { data: CreateProjectInvitationInput },
  context: any
) => {
  const { projectId, vendorCompanyIds, customerCompanyId } = data;
  try {
    const [project] = await Promise.all([
      ProjectApiUtils.getProject(projectId),
    ]);

    if (!project) {
      throw ErrorUtils.notFoundError();
    }

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        vendorCompanyIds.map((vendorCompanyId) => {
          return Promise.all([
            sequelize.models.project_invitations.create(
              {
                id: uuidv4(),
                projectId,
                vendorCompanyId,
                customerCompanyId,
              },
              { transaction }
            ),
            sequelize.models.project_permissions.create(
              {
                id: uuidv4(),
                projectId,
                companyId: vendorCompanyId,
                permission: ProjectPermission.Bidder,
              },
              {
                transaction,
              }
            ),
          ]);
        })
      );
    });

    const vendorsUsers = await Promise.all(
      vendorCompanyIds.map(async (companyId) => {
        return await sequelize.models.users
          .findAll({
            where: {
              companyId,
            },
          })
          .then((users) => users.map((u) => u.get("id")) as string[]);
      })
    );
    const customerCompany = await CompanyApiUtils.getCompanyWithCompanyId(
      customerCompanyId
    );

    const allUsers = [];
    for (let vendorUsers of vendorsUsers) {
      for (let id of vendorUsers) {
        allUsers.push(id);
      }
    }
    NotificationService.sendNotification(PROJECT_INVITATION_ROUTE, {
      receivers: allUsers,
      data: {
        projectId,
        message: "app.notification.project.newInvitation",
        projectName: project.name,
        customerName: customerCompany.name,
      },
    });
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createProjectInvitation,
  },
};
