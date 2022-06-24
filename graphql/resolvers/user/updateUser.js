import { updateUser as updateUserApi } from "../../../api/user/userApis.js";

const updateUser = (parent, args, context) => {
  return updateUserApi(args);
}

export default updateUser;