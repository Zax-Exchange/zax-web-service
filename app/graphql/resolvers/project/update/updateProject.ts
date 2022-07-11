import { updateProject as updateProjectApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectInput } from "../../../../api/types/update/projectTypes";

const updateProject = (parent: any, args: Record<string, UpdateProjectInput>, context: any, info: any) => {
  return updateProjectApi(args.data);
};

export default updateProject;