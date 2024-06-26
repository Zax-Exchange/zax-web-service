import CompanyApiUtils from "../../../../utils/companyUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorProjectsInput,
  ProjectPermission,
  VendorProjectOverview,
} from "../../../resolvers-types.generated";

const getVendorProjects = async (
  parent: any,
  { data }: { data: GetVendorProjectsInput },
  context: any
) => {
  const { userId } = data;
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);

    const res: VendorProjectOverview[] = [];
    for (let permission of permissions) {
      const [bid, project] = await Promise.all([
        ProjectApiUtils.getPermissionedProjectBid(
          permission.projectBidId,
          permission.permission as ProjectPermission
        ),
        ProjectApiUtils.getProjectInstance(permission.projectId),
      ]);

      // If somehow we cannot find project based on the found permission
      if (!project) continue;

      const company = await CompanyApiUtils.getCompanyWithCompanyId(
        project.companyId
      );

      res.push({
        ...project,
        companyName: company.name,
        bidStatus: bid.status,
        bidId: bid.id,
        permission: permission.permission,
      });
    }

    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getVendorProjects,
  },
};
