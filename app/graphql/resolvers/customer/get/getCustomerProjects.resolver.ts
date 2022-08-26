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

    const res: CustomerProject[] = [];
    for (let permission of projectPermissions) {
      const project = (await ProjectApiUtils.getPermissionedProject(
        permission.projectId,
        permission.permission as ProjectPermission
      )) as CustomerProject;
      const bids = await ProjectApiUtils.getProjectBidsByProjectId(
        permission.projectId
      );
      res.push({
        ...project,
        bids,
      });
    }
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getCustomerProjects,
  },
};
