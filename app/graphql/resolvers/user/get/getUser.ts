import { getUserWithUserId as getUserWithUserIdApi} from "../../../../api/user/getUserApis";


const getUserWithUserId = (parent: any, args: Record<string, number>, context:any) => {
  return getUserWithUserIdApi(args.userId)
}

export {
  getUserWithUserId
}