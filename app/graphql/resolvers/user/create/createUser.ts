import { createUser as createUserApi } from "../../../../api/user/createUserApis";
import { CreateUserInput } from "../../../resolvers-types";

const createUser = (
  parent: any,
  args: Record<string, CreateUserInput>,
  context: any
) => {
  return createUserApi(args.data);
};

export default createUser;
