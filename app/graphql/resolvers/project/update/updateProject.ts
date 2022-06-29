import { updateProject as updateProjectApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectInput } from "../../../../types/projectTypes";

const updateProject = (parent: any, args: Record<string, UpdateProjectInput>, context: any, info: any) => {
  
  return updateProjectApi(args);
};

export default updateProject;