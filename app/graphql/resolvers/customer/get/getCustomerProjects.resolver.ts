import { projects, projectsAttributes } from "../../../../db/models/projects";
import { project_permissionsAttributes } from "../../../../db/models/project_permissions";
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
  const { userId, permissions } = data;
  try {
    const allPermissions = await ProjectApiUtils.getProjectPermissions(userId);
    let projectPermissions: project_permissionsAttributes[] = [];

    if (permissions && permissions.length) {
      projectPermissions = allPermissions.filter((p) =>
        permissions.includes(p.permission as ProjectPermission)
      );
    } else {
      projectPermissions = allPermissions;
    }

    return await Promise.all(
      projectPermissions.map(async (permission) => {
        const project = await ProjectApiUtils.getProjectInstance(
          permission.projectId
        );

        return {
          ...project,
          permission: permission.permission,
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
