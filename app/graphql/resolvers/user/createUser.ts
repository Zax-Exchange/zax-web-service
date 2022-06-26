import { createUser as createUserApi } from "../../../api/user/userApis.js";

const createUser = (parent: any, args: any, context: any) => {
  return createUserApi(args);
};

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    companyId: number;
    isAdmin: boolean;
}

export default createUser;