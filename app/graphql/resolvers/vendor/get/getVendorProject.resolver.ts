import { project_bid_permissionsAttributes } from "../../../../db/models/project_bid_permissions";
import { project_permissionsAttributes } from "../../../../db/models/project_permissions";
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

    // check project exists first because if project doesn't exist there will be no permission
    // so project not found will be masked as permission denied which we don't want
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
