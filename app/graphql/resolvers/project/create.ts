import { createProject as createProjectApi } from "../../../api/project/createProjectApis";
import { CreateProjectInput } from "../../resolvers-types.generated";

const createProject = (
  parent: any,
  args: Record<string, CreateProjectInput>,
  context: any,
  info: any
) => {
  return createProjectApi(args.data);
};

export default {
  Mutation: {
    createProject,
  },
};
