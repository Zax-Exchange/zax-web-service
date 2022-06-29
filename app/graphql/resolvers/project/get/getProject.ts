import { getProjectsWithUserId as getProjectsWithUserIdApi } from "../../../../api/project/getProjectApis";

const getProjectsWithUserId = (parent: any, args: Record<string, number>, context: any, info: any) => {
  return getProjectsWithUserIdApi(args.id);
};

const getProjectsWithProjectId = (parent: any, args: Record<string, number>, context: any, info: any) => {
  return getProjectsWithUserIdApi(args.id);
};

export {
  getProjectsWithUserId,
  getProjectsWithProjectId
};