import { updateUser as updateUserApi } from "../../../../api/user/updateUserApis";
import * as userTypes from "../../../../types/update/userTypes";

const updateUser = async(parent: any, args: Record<string, userTypes.UpdateUserInput>, context:any) => {
  return await updateUserApi(args.data);
};

export interface UpdateUserInput {
  name: string,
  email: string,
  id: number
}

export default updateUser;