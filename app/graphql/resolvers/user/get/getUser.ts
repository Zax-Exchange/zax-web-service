import { getUserWithUserId as getUserWithUserIdApi} from "../../../../api/user/getUserApis";


const getUserWithUserId = (id: number) => getUserWithUserIdApi(id)

export {
  getUserWithUserId
}