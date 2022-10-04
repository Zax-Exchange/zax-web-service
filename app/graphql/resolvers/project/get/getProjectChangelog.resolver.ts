import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectChangelogInput } from "../../../resolvers-types.generated";

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

export default {
  Query: {
    getProjectChangelog,
  },
};
