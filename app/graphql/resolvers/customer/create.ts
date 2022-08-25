import { CreateCustomerInput } from "../../resolvers-types.generated";
import { createCustomer as createCustomerApi } from "../../../api/customer/createCustomerApis";

const createCustomer = (
  parents: any,
  args: Record<string, CreateCustomerInput>,
  context: any
) => {
  return createCustomerApi(args.data);
};

export default {
  Mutation: {
    createCustomer,
  },
};
