import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetCustomerProjectInvitationsInput,
  ProjectInvitation,
} from "../../../resolvers-types.generated";
import { project_invitationsAttributes } from "../../../../db/models/project_invitations";
import CompanyApiUtils from "../../../../utils/companyUtils";

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
