import sequelize from "../../../../postgres/dbconnection";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetSearchProjectDetailInput,
  ProjectPermission,
  ProjectVisibility,
} from "../../../resolvers-types.generated";

const getSearchProjectDetail = async (
  parent: any,
  { data }: { data: GetSearchProjectDetailInput },
  context: any
) => {
  const { projectId, companyId } = data;
  try {
    const [permission, project] = await Promise.all([
      sequelize.models.project_permissions.findOne({
        where: {
          projectId,
          companyId,
        },
      }),
      ProjectApiUtils.getProject(projectId),
    ]);

    if (!project) {
      throw ErrorUtils.notFoundError();
    }

    // this prevents users from accessing projects through projectId in url directly
    if (
      (permission?.get("permission") === ProjectPermission.Bidder &&
        project.visibility === ProjectVisibility.Private) ||
      project.visibility === ProjectVisibility.Public
    ) {
      return project;
    }

    throw ErrorUtils.permissionDeniedError();
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getSearchProjectDetail,
  },
};
