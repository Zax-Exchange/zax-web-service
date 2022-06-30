import { createProjectBidPermission as createProjectBidPermissionApi } from "../../../../api/project/createProjectApis";
import { CreateProjectBidPermissionInput } from "../../../../types/projectTypes";

const createProjectBidPermission = (parent: any, args: Record<string, CreateProjectBidPermissionInput>, context: any, info: any) => {
  return createProjectBidPermissionApi(args.data);
};

export default createProjectBidPermission;