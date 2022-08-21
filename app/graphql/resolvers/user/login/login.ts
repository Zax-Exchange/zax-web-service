import loginApi from "../../../../api/user/loginUserApis";
import { UserLoginInput } from "../../../resolvers-types";

const login = (
  parent: any,
  args: Record<string, UserLoginInput>,
  context: any
) => {
  return loginApi(args.data);
};

export default login;
