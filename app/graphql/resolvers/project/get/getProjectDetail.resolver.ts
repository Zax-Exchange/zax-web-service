import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectDetailInput } from "../../../resolvers-types.generated";

const getProjectDetail = async (
  parent: any,
  { data }: { data: GetProjectDetailInput },
  context: any
) => {
  const { projectId } = data;
  try {
    const project = await ProjectApiUtils.getProject(projectId);
    if (!project) {
      throw ErrorUtils.notFoundError();
    }
    return project;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectDetail,
  },
};
