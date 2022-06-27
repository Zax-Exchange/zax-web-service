import { createProject as createProjectApi } from "../../../api/project/projectApis";

const createProject = (parent: any, args: any, context: any) => {
  return createProjectApi(args);
};

export default createProject;