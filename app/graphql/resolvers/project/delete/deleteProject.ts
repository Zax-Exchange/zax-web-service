import { deleteProject as deleteProjectApi } from "../../../../api/project/deleteProjectApis";
import { DeleteProjectInput } from "../../../../types/projectTypes";

const deleteProject = (parent: any, args: Record<string, DeleteProjectInput>, context: any, info: any) => {
  return deleteProjectApi(args.data);
};

export default deleteProject;