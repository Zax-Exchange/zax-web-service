import CompanyApiUtils from "../../../../utils/companyUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorGuestProjectsInput,
  GetVendorProjectsInput,
  PermissionedProject,
  Project,
  ProjectPermission,
  VendorGuestProjectOverview,
  VendorProjectOverview,
} from "../../../resolvers-types.generated";

const getVendorGuestProjects = async (
  parent: any,
  { data }: { data: GetVendorGuestProjectsInput },
  context: any
) => {
  const { userId } = data;
  try {
    const permissions = await ProjectApiUtils.getProjectPermissions(userId);

    const res = [];
    for (let permission of permissions) {
      const project = await ProjectApiUtils.getProject(permission.projectId);

      // If somehow we cannot find project based on the found permission
      if (!project) continue;

      res.push({
        ...project,
        permission: permission.permission,
      });
    }

    return res as VendorGuestProjectOverview[];
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getVendorGuestProjects,
  },
};
