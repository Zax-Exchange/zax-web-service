import { createOrUpdateProjectBidPermission as createOrUpdateProjectBidPermissionApi } from "../../../../api/project/createProjectApis";
import { CreateOrUpdateProjectBidPermissionInput } from "../../../../types/projectTypes";

const createOrUpdateProjectBidPermission = (parent: any, args: Record<string, CreateOrUpdateProjectBidPermissionInput>, context: any, info: any) => {
  return createOrUpdateProjectBidPermissionApi(args.data);
};

export default createOrUpdateProjectBidPermission;