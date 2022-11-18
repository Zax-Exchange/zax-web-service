import { project_permissionsAttributes } from "../../../../models/project_permissions";
import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CustomerProject,
  GetCustomerProjectInput,
  ProjectPermission,
} from "../../../resolvers-types.generated";

/** Gets a single customer project based on projectId */
const getCustomerProject = async (
  parent: any,
  { data }: { data: GetCustomerProjectInput },
  context: any
) => {
  try {
    const { projectId, userId } = data;
    const permission = await sequelize.models.project_permissions
      .findOne({
        where: {
          userId,
          projectId,
        },
      })
      .then((p) => p?.get({ plain: true }) as project_permissionsAttributes);

    if (!permission) {
      throw ErrorUtils.permissionDeniedError();
    }

    const [project, bids] = await Promise.all([
      ProjectApiUtils.getPermissionedProject(
        permission.projectId,
        permission.permission as ProjectPermission
      ),
      ProjectApiUtils.getProjectBidsByProjectId(permission.projectId),
    ]);

    if (!project) {
      throw ErrorUtils.notFoundError();
    }

    return {
      ...project,
      bids,
    } as CustomerProject;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCustomerProject,
  },
};
