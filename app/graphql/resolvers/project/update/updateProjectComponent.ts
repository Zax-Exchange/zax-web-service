import { updateProjectComponent as updateProjectComponentApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectComponentInput } from "../../../../../types/projectTypes";

const updateProjectComponent = (parent: any, args: Record<string, UpdateProjectComponentInput>, context: any, info: any) => {
  return updateProjectComponentApi(args);
};

export default updateProjectComponent;