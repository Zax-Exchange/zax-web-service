import { createUser as createUserApi } from "../../../../api/user/userApis";
import * as userTypes from "../../../../types/userTypes";

const createUser = (parent: any, args: Record<string, userTypes.CreateUserInput>, context: any) => {
  return createUserApi(args.data);
};

export default createUser;