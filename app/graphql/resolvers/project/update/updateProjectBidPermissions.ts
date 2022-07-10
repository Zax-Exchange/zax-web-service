import { updateProjectBidPermissions as updateProjectBidPermissionsApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectBidPermissionsInput } from "../../../../api/types/update/projectTypes";

const updateProjectBidPermissions = (parent: any, args: Record<string, UpdateProjectBidPermissionsInput>, context: any, info: any) => {
  return updateProjectBidPermissionsApi(args.data);
};

export default updateProjectBidPermissions;