import { projects, projectsAttributes } from "../../../../models/projects";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  CustomerProject,
  CustomerProjectOverview,
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

    return await Promise.all(
      projectPermissions.map(async (permission) => {
        const project = await ProjectApiUtils.getProjectInstance(
          permission.projectId
        );

        return {
          ...project,
          permission: permission.permission,
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString(),
        } as CustomerProjectOverview;
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
