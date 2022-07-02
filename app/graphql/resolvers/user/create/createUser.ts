import { createUser as createUserApi } from "../../../../api/user/createUserApis";
import * as userTypes from "../../../../types/create/userTypes";

const createUser = (parent: any, args: Record<string, userTypes.CreateUserInput>, context: any) => {
  return createUserApi(args.data);
};

export default createUser;