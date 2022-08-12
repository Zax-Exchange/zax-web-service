import notificationService from "../../../../api/notification/NotificationService";
import { createProjectBid as createProjectBidApi } from "../../../../api/project/createProjectApis";
import { CreateProjectBidInput } from "../../../../api/types/create/projectTypes";

const createProjectBid = (parent: any, args: Record<string, CreateProjectBidInput>, context: any, info: any) => {
  notificationService.broadcastNewBid(args.data);
  return createProjectBidApi(args.data);
};

export default createProjectBid;