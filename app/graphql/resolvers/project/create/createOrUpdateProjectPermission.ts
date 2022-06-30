import { createOrUpdateProjectPermission as createOrUpdateProjectPermissionApi } from "../../../../api/project/createProjectApis";
import { CreateOrUpdateProjectPermissionInput } from "../../../../types/projectTypes";

const createOrUpdateProjectPermission = (parent: any, args: Record<string, CreateOrUpdateProjectPermissionInput>, context: any, info: any) => {
  return createOrUpdateProjectPermissionApi(args.data);
};

export default createOrUpdateProjectPermission;