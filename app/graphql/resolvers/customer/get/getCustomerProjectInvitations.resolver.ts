import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CreateProjectInvitationInput,
  GetCustomerProjectInvitationsInput,
  ProjectInvitation,
  ProjectPermission,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import { project_invitationsAttributes } from "../../../../models/project_invitations";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";
// only private projects are allowed to create invitations
const getCustomerProjectInvitations = async (
  parent: any,
  { data }: { data: GetCustomerProjectInvitationsInput },
  context: any
): Promise<ProjectInvitation[]> => {
  const { projectId } = data;
  try {
    const invitations = await sequelize.models.project_invitations
      .findAll({
        where: {
          projectId,
        },
      })
      .then((invs) =>
        invs.map(
          (inv) => inv.get({ plain: true }) as project_invitationsAttributes
        )
      );

    return Promise.all(
      invitations.map(async (invitation) => {
        const [project, customerCompany, vendorCompany] = await Promise.all([
          ProjectApiUtils.getProject(projectId),
          CompanyApiUtils.getCompanyWithCompanyId(invitation.customerCompanyId),
          CompanyApiUtils.getCompanyWithCompanyId(invitation.vendorCompanyId),
        ]);

        if (!project) {
          throw ErrorUtils.notFoundError();
        }

        return {
          projectId,
          customerCompanyId: customerCompany.id,
          vendorCompanyId: vendorCompany.id,
          customerName: customerCompany.name,
          projectName: project?.name,
          vendorName: vendorCompany.name,
        } as ProjectInvitation;
      })
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCustomerProjectInvitations,
  },
};
