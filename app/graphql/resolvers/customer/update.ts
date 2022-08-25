import { UpdateCustomerInput } from "../../resolvers-types.generated";
import { updateCustomer as updateCustomerApi } from "../../../api/customer/updateCustomerApis";
const updateCustomer = (
  parents: any,
  args: Record<string, UpdateCustomerInput>,
  context: any
) => {
  return updateCustomerApi(args.data);
};

export default {
  Mutation: {
    updateCustomer,
  },
};
