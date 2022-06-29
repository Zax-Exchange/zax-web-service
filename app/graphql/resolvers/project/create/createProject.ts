import { createProject as createProjectApi } from "../../../../api/project/createProjectApis";
import { CreateProjectInput } from "../../../../types/projectTypes";

const createProject = (parent: any, args: Record<string, CreateProjectInput>, context: any, info: any) => {
  return createProjectApi(args);
};

export default createProject;