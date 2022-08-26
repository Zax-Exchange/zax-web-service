import CompanyApiUtils from "../../../../utils/companyUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorProjectsInput,
  ProjectPermission,
  VendorProject,
} from "../../../resolvers-types.generated";

const getVendorProjects = async (
  parent: any,
  { data }: { data: GetVendorProjectsInput },
  context: any
) => {
  const { userId } = data;
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);

    const res = [];
    for (let permission of permissions) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(
        permission.projectBidId,
        permission.permission as ProjectPermission
      );
      const project = (await ProjectApiUtils.getPermissionedProject(
        bid.projectId
      )) as VendorProject;
      const company = await CompanyApiUtils.getCompanyWithCompanyId(
        project.companyId
      );

      res.push({
        ...project,
        permission: permission.permission,
        customerName: company.name,
        bidInfo: bid,
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
