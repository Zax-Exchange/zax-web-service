import { createProjectBid as createProjectBidApi } from "../../../../api/project/createProjectApis";
import { CreateProjectBidInput } from "../../../../types/create/projectTypes";

const createProjectBid = (parent: any, args: Record<string, CreateProjectBidInput>, context: any, info: any) => {
  return createProjectBidApi(args.data);
};

export default createProjectBid;