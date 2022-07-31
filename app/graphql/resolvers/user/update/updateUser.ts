import { 
  updateUser as updateUserApi,
  updateUserPassword as updateUserPasswordApi,
  updateUserPower as updateUserPowerApi
 } from "../../../../api/user/updateUserApis";
import * as userTypes from "../../../../api/types/update/userTypes";

const updateUser = async(parent: any, args: Record<string, userTypes.UpdateUserInput>, context:any) => {
  return await updateUserApi(args.data);
};

const updateUserPassword = async(parent: any, args: Record<string, userTypes.UpdateUserPasswordInput>, context: any) => {
  return await updateUserPasswordApi(args.data);
};

const updateUserPower = async(parent: any, args: Record<string, userTypes.UpdateUserPowerInput>, context:any) => {
  return await updateUserPowerApi(args.data);
};

export {
  updateUser,
  updateUserPassword,
  updateUserPower
}