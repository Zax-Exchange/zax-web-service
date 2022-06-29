import { createProjectPermission as createProjectPermissionApi } from "../../../../api/project/createProjectApis";
import { CreateProjectPermissionInput } from "../../../../types/projectTypes";

const createProjectPermission = (parent: any, args: Record<string, CreateProjectPermissionInput>, context: any, info: any) => {
  return createProjectPermissionApi(args);
};

export default createProjectPermission;