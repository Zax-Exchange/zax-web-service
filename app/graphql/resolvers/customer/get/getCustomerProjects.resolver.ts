import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CustomerProject,
  GetCustomerProjectsInput,
  ProjectPermission,
} from "../../../resolvers-types.generated";

const getCustomerProjects = async (
  parent: any,
  { data }: { data: GetCustomerProjectsInput },
  context: any
) => {
  const { userId } = data;
  try {
    const projectPermissions = await ProjectApiUtils.getProjectPermissions(
      userId
    );

    return Promise.all(
      projectPermissions.map(async (permission) => {
        const [project, bids] = await Promise.all([
          ProjectApiUtils.getPermissionedProject(
            permission.projectId,
            permission.permission as ProjectPermission
          ),
          ProjectApiUtils.getProjectBidsByProjectId(permission.projectId),
        ]);

        return {
          ...project,
          bids,
        } as CustomerProject;
      })
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCustomerProjects,
  },
};
