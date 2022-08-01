import { 
  deactivateUser as deactivateUserApi
} from "../../../../api/user/deleteUserApis";

const deactivateUser = (parent: any, { email } : { email: string }, context: any) => {
  return deactivateUserApi(email);
}

export {
  deactivateUser
}