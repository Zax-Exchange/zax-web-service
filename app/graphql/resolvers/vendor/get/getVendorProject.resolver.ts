import { project_bid_permissionsAttributes } from "../../../../models/project_bid_permissions";
import { project_permissionsAttributes } from "../../../../models/project_permissions";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorProjectInput,
  VendorProject,
} from "../../../resolvers-types.generated";

const getVendorProject = async (
  parent: any,
  { data }: { data: GetVendorProjectInput },
  context: any
) => {
  try {
    const { projectId, userId } = data;
    const [permission, foundProject] = await Promise.all([
      sequelize.models.project_bid_permissions
        .findOne({
          where: {
            userId,
            projectId,
          },
        })
        .then(
          (p) => p?.get({ plain: true }) as project_bid_permissionsAttributes
        ),
      sequelize.models.projects.findByPk(projectId),
    ]);

    if (!foundProject) {
      throw ErrorUtils.notFoundError();
    }

    if (!permission) {
      throw ErrorUtils.permissionDeniedError();
    }

    const bid = await ProjectApiUtils.getPermissionedProjectBid(
      permission.projectBidId,
      permission.permission
    );
    const project = await ProjectApiUtils.getPermissionedProject(bid.projectId);

    if (!project) {
      throw ErrorUtils.notFoundError();
    }
    return {
      ...project,
      bidInfo: bid,
    } as VendorProject;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getVendorProject,
  },
};
