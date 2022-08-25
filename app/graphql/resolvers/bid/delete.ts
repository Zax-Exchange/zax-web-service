import { DeleteProjectBidPermissionsInput } from "../../resolvers-types.generated";
import { deleteProjectBidPermissions as deleteProjectBidPermissionsApi } from "../../../api/project/deleteProjectApis";
const deleteProjectBidPermissions = (
  parent: any,
  args: Record<string, DeleteProjectBidPermissionsInput>,
  context: any,
  info: any
) => {
  return deleteProjectBidPermissionsApi(args.data);
};

export default {
  Mutation: {
    deleteProjectBidPermissions,
  },
};
