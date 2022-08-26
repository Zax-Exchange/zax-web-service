import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectDetailInput } from "../../../resolvers-types.generated";

const getProjectDetail = async (
  parent: any,
  { data }: { data: GetProjectDetailInput },
  context: any
) => {
  const { projectId } = data;
  try {
    return await ProjectApiUtils.getProject(projectId);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectDetail,
  },
};
