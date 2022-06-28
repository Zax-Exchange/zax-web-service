import { createProjectBid as createProjectBidApi } from "../../../../api/project/createProjectApis";
import { CreateProjectBidInput } from "../../../../../types/projectTypes";

const createProjectBid = (parent: any, args: Record<string, CreateProjectBidInput>, context: any, info: any) => {
  return createProjectBidApi(args);
};

export default createProjectBid;