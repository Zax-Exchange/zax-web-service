import { 
  deleteProject as deleteProjectApi,
  deleteProjectPermissions as deleteProjectPermissionsApi,
  deleteProjectBidPermissions as deleteProjectBidPermissionsApi 
} from "../../../../api/project/deleteProjectApis";
import * as deleteProjectTypes from "../../../../api/types/delete/projectTypes";

const deleteProject = (parent: any, args: Record<string, number>, context: any, info: any) => {
  return deleteProjectApi(args.projectId);
};

const deleteProjectPermissions = (parent: any, args: Record<string, deleteProjectTypes.DeleteProjectPermissionsInput>, context: any, info: any) => {
  return deleteProjectPermissionsApi(args.data);
};

const deleteProjectBidPermissions = (parent: any, args: Record<string, deleteProjectTypes.DeleteProjectBidPermissionsInput>, context: any, info: any) => {
  return deleteProjectBidPermissionsApi(args.data);
};
export {
  deleteProject,
  deleteProjectBidPermissions,
  deleteProjectPermissions
}