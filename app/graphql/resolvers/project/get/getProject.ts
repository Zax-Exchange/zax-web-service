import { getProjectsWithUserId as getProjectsWithUserIdApi } from "../../../../api/project/getProjectApis";
import { getProjectWithProjectId as getProjectWithProjectIdApi } from "../../../../api/project/getProjectApis";
import * as projectTypes from "../../../../types/projectTypes";

const getProjectsWithUserId = (parent: any, args: Record<string, number>, context: any, info: any) => {
  return getProjectsWithUserIdApi(args.id);
};

const getProjectWithProjectId = (parent: any, args: Record<string, projectTypes.getProjectWithProjectIdInput>, context: any, info: any) => {

  return getProjectWithProjectIdApi(args.data);
};

export {
  getProjectsWithUserId,
  getProjectWithProjectId
};