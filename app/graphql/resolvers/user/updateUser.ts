import { updateUser as updateUserApi } from "../../../api/user/userApis.js";

const updateUser = async(parent: any, args: UpdateUserInput, context:any) => {
  const res = await updateUserApi(args)
  return res
};

export interface UpdateUserInput {
  name: string,
  email: string,
  id: number
}

export default updateUser;