import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectChangelogInput, GetProjectComponentChangelogInput } from "../../../resolvers-types.generated";

const getProjectChangelog = async (
  parent: any,
  { data }: { data: GetProjectChangelogInput },
  context: any
) => {
  const { projectId } = data;
  try {
    return await ProjectApiUtils.getProjectChangelog(projectId);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getProjectComponentChangelog = async (
  parent: any,
  { data }: { data: GetProjectComponentChangelogInput },
  context: any
) => {
  const { projectComponentId } = data;
  try {
    return await ProjectApiUtils.getProjectComponentChangelog(projectComponentId);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectChangelog,
    getProjectComponentChangelog,
  },
};
