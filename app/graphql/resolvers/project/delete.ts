import {
  deleteProject as deleteProjectApi,
  deleteProjectPermissions as deleteProjectPermissionsApi,
  deleteProjectBidPermissions as deleteProjectBidPermissionsApi,
} from "../../../api/project/deleteProjectApis";
import {
  DeleteProjectBidPermissionsInput,
  DeleteProjectPermissionsInput,
} from "../../resolvers-types.generated";

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

export default {
  Mutation: { deleteProject, deleteProjectPermissions },
};
