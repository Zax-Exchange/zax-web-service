import { project_bid_permissionsAttributes } from "../../../../models/project_bid_permissions";
import { project_permissionsAttributes } from "../../../../models/project_permissions";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetVendorGuestProjectInput,
  GetVendorGuestProjectsInput,
  GetVendorProjectInput,
  VendorGuestProject,
  VendorProject,
} from "../../../resolvers-types.generated";

const getVendorGuestProject = async (
  parent: any,
  { data }: { data: GetVendorGuestProjectInput },
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

    const project = await ProjectApiUtils.getProject(permission.projectId);

    if (!project) {
      throw ErrorUtils.notFoundError();
    }
    return {
      ...project,
      permission: permission.permission,
    } as VendorGuestProject;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getVendorGuestProject,
  },
};
