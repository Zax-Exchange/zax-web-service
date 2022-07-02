import { getProjectsWithUserId as getProjectsWithUserIdApi } from "../../../../api/project/getProjectApis";
import { getProjectWithProjectId as getProjectWithProjectIdApi } from "../../../../api/project/getProjectApis";
import { getProjectBidWithProjectBidId as getProjectBidWithProjectBidIdApi } from "../../../../api/project/getProjectApis";
import { getProjectBidsWithUserId as getProjectBidsWithUserIdApi } from "../../../../api/project/getProjectApis";
import * as projectTypes from "../../../../types/get/projectTypes";

const getProjectsWithUserId = (parent: any, args: Record<string, number>, context: any, info: any) => {
  return getProjectsWithUserIdApi(args.id);
};

const getProjectWithProjectId = (parent: any, args: Record<string, projectTypes.getProjectWithProjectIdInput>, context: any, info: any) => {

  return getProjectWithProjectIdApi(args.data);
};

const getProjectBidWithProjectBidId = (parent: any, args: Record<string, projectTypes.getProjectBidWithProjectBidIdInput>, context: any, info: any) => {

  return getProjectBidWithProjectBidIdApi(args.data);
};

const getProjectBidsWithUserId = (parent: any, args: Record<string, number>, context: any, info: any) => {

  return getProjectBidsWithUserIdApi(args.id);
};

export {
  getProjectsWithUserId,
  getProjectWithProjectId,
  getProjectBidWithProjectBidId,
  getProjectBidsWithUserId
};