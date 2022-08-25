import { updateProjectBidPermissions as updateProjectBidPermissionsApi } from "../../../api/project/updateProjectApis";
import { UpdateProjectBidPermissionsInput } from "../../resolvers-types.generated";

const updateProjectBidPermissions = (
  parent: any,
  args: Record<string, UpdateProjectBidPermissionsInput>,
  context: any,
  info: any
) => {
  return updateProjectBidPermissionsApi(args.data);
};

export default {
  Mutation: {
    updateProjectBidPermissions,
  },
};
