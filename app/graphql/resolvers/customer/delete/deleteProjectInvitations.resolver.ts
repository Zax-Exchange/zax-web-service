import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CreateProjectInvitationInput,
  DeleteProjectInvitationInput,
  GetCustomerProjectInvitationsInput,
  ProjectInvitation,
  ProjectPermission,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import { project_invitationsAttributes } from "../../../../models/project_invitations";
import CompanyApiUtils from "../../../../utils/companyUtils";
import UserApiUtils from "../../../../utils/userUtils";

const deleteProjectInvitation = async (
  parent: any,
  { data }: { data: DeleteProjectInvitationInput },
  context: any
) => {
  const { projectId, customerCompanyId, vendorCompanyIds } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        vendorCompanyIds.map((vendorCompanyId) => {
          return sequelize.models.project_invitations.destroy({
            where: {
              projectId,
              customerCompanyId,
              vendorCompanyId,
            },
            transaction,
          });
        })
      );
    });
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deleteProjectInvitation,
  },
};
