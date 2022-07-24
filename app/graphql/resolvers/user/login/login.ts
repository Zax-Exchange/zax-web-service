import { UserLoginInput } from "../../../../api/types/common/userTypes"
import loginApi from "../../../../api/user/loginUserApis";

const login = (parent: any, args: Record<string, UserLoginInput>, context: any) => {
  return loginApi(args.data);
}

export default login;