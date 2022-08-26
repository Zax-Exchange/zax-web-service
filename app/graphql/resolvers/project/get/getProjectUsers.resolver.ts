import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectUsersInput } from "../../../resolvers-types.generated";

/** Gets all customer users that have permissions to see project */
const getProjectUsers = async (
  parent: any,
  { data }: { data: GetProjectUsersInput },
  context: any
) => {
  const { projectId } = data;
  try {
    return await ProjectApiUtils.getProjectUsers(projectId);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  Query: {
    getProjectUsers,
  },
};
