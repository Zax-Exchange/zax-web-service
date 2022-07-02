import { updateProjectPermissions as updateProjectPermissionsApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectPermissionsInput } from "../../../../types/update/projectTypes";

const updateProjectPermissions = (parent: any, args: Record<string, UpdateProjectPermissionsInput>, context: any, info: any) => {
  return updateProjectPermissionsApi(args.data);
};

export default updateProjectPermissions;