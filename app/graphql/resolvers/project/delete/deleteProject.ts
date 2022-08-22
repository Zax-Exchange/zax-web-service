import {
  deleteProject as deleteProjectApi,
  deleteProjectPermissions as deleteProjectPermissionsApi,
  deleteProjectBidPermissions as deleteProjectBidPermissionsApi,
} from "../../../../api/project/deleteProjectApis";
import {
  DeleteProjectBidPermissionsInput,
  DeleteProjectPermissionsInput,
} from "../../../resolvers-types";

const deleteProject = (
  parent: any,
  args: Record<string, string>,
  context: any,
  info: any
) => {
  return deleteProjectApi(args.projectId);
};

const deleteProjectPermissions = (
  parent: any,
  args: Record<string, DeleteProjectPermissionsInput>,
  context: any,
  info: any
) => {
  return deleteProjectPermissionsApi(args.data);
};

const deleteProjectBidPermissions = (
  parent: any,
  args: Record<string, DeleteProjectBidPermissionsInput>,
  context: any,
  info: any
) => {
  return deleteProjectBidPermissionsApi(args.data);
};
export { deleteProject, deleteProjectBidPermissions, deleteProjectPermissions };
