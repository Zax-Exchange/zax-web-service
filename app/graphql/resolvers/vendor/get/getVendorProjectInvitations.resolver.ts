import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorProjectInvitationsInput,
  ProjectInvitation,
} from "../../../resolvers-types.generated";
import { project_invitationsAttributes } from "../../../../db/models/project_invitations";
import CompanyApiUtils from "../../../../utils/companyUtils";

const getVendorProjectInvitations = async (
  parent: any,
  { data }: { data: GetVendorProjectInvitationsInput },
  context: any
): Promise<ProjectInvitation[]> => {
  const { companyId } = data;
  try {
    const invitations = await sequelize.models.project_invitations
      .findAll({
        where: {
          vendorCompanyId: companyId,
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
          ProjectApiUtils.getProject(invitation.projectId),
          CompanyApiUtils.getCompanyWithCompanyId(invitation.customerCompanyId),
          CompanyApiUtils.getCompanyWithCompanyId(invitation.vendorCompanyId),
        ]);

        return {
          projectId: invitation.projectId,
          customerCompanyId: customerCompany.id,
          vendorCompanyId: vendorCompany.id,
          customerName: customerCompany.name,
          projectName: project!.name,
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
    getVendorProjectInvitations,
  },
};
