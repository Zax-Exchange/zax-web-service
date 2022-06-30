import { createUser as createUserApi } from "../../../../api/user/userApis";

const createUser = (parent: any, args: any, context: any) => {
  return createUserApi(args);
};

export default createUser;