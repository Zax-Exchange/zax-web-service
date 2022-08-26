import ProjectApiUtils from "../../../../utils/projectUtils";
import { GetProjectBidUsersInput } from "../../../resolvers-types.generated";

/** Gets all vendor users that have permissions to see project */
const getProjectBidUsers = async (
  parent: any,
  { data }: { data: GetProjectBidUsersInput },
  context: any
) => {
  const { projectBidId } = data;
  try {
    return await ProjectApiUtils.getProjectBidUsers(projectBidId);
  } catch (e) {
    return Promise.reject(e);
  }
};
export default {
  Query: {
    getProjectBidUsers,
  },
};
