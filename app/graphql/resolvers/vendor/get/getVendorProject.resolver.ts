import { project_bid_permissionsAttributes } from "../../../../models/project_bid_permissions";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
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
    const permission = await sequelize.models.project_bid_permissions
      .findOne({
        where: {
          userId,
          projectId,
        },
      })
      .then(
        (p) => p?.get({ plain: true }) as project_bid_permissionsAttributes
      );

    const bid = await ProjectApiUtils.getPermissionedProjectBid(
      permission.projectBidId,
      permission.permission
    );
    const project = (await ProjectApiUtils.getPermissionedProject(
      bid.projectId
    )) as VendorProject;
    const company = await CompanyApiUtils.getCompanyWithCompanyId(
      project.companyId
    );

    return {
      ...project,
      customerName: company.name,
      bidInfo: bid,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getVendorProject,
  },
};