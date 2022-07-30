import { getUserWithUserId as getUserWithUserIdApi} from "../../../../api/user/getUserApis";
import { getAllUsersWithinCompany as getAllUsersWithinCompanyApi } from "../../../../api/user/getUserApis";

const getUserWithUserId = (parent: any, args: Record<string, string>, context:any) => {
  return getUserWithUserIdApi(args.userId)
}

const getAllUsersWithinCompany = (parent: any, args: Record<string, string>, context:any) => {
  return getAllUsersWithinCompanyApi(args.companyId)
}
export {
  getUserWithUserId,
  getAllUsersWithinCompany
}