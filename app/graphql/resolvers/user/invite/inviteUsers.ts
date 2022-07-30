import { inviteUser as inviteUserApi } from "../../../../api/user/inviteUserApis"
const inviteUser = (parent: any, { email, userId }: {email: string, userId: string}, context: any) => {
  return inviteUserApi(email, userId);
}

export {
  inviteUser
}