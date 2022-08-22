import {
  updateUser as updateUserApi,
  updateUserPassword as updateUserPasswordApi,
  updateUserPower as updateUserPowerApi,
} from "../../../../api/user/updateUserApis";
import {
  UpdateUserInput,
  UpdateUserPasswordInput,
  UpdateUserPowerInput,
} from "../../../resolvers-types";

const updateUser = async (
  parent: any,
  args: Record<string, UpdateUserInput>,
  context: any
) => {
  return await updateUserApi(args.data);
};

const updateUserPassword = async (
  parent: any,
  args: Record<string, UpdateUserPasswordInput>,
  context: any
) => {
  return await updateUserPasswordApi(args.data);
};

const updateUserPower = async (
  parent: any,
  args: Record<string, UpdateUserPowerInput>,
  context: any
) => {
  return await updateUserPowerApi(args.data);
};

export { updateUser, updateUserPassword, updateUserPower };
