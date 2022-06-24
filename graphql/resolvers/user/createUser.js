import { createUser as createUserApi } from "../../../api/user/userApis.js";

const createUser = (parent, args, context) => {
  return createUserApi(args);
};

export default createUser;