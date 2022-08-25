import { UpdateVendorInput } from "../../resolvers-types.generated";
import { updateVendor as updateVendorApi } from "../../../api/vendor/updateVendorApis";
const updateVendor = (
  parents: any,
  args: Record<string, UpdateVendorInput>,
  context: any
) => {
  return updateVendorApi(args.data);
};

export default {
  Mutation: {
    updateVendor,
  },
};
