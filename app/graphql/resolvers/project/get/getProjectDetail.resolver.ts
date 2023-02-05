import ErrorUtils from "../../../../utils/ErrorUtils";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  GetProjectDetailInput,
  ProjectVisibility,
} from "../../../resolvers-types.generated";

// currently used by guest project detail
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
