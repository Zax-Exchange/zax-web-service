import { CreateVendorInput } from "../../resolvers-types.generated";
import { createVendor as createVendorApi } from "../../../api/vendor/createVendorApis";
const createVendor = (
  parents: any,
  args: Record<string, CreateVendorInput>,
  context: any
) => {
  return createVendorApi(args.data);
};

export default {
  Mutation: {
    createVendor,
  },
};
