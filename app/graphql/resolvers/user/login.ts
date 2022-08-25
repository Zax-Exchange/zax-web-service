import loginApi from "../../../api/user/loginUserApis";
import { UserLoginInput } from "../../resolvers-types.generated";

const login = (
  parent: any,
  args: Record<string, UserLoginInput>,
  context: any
) => {
  return loginApi(args.data);
};

export default {
  Query: {
    login,
  },
};
