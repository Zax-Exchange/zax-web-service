import { updateProjectBid as updateProjectBidApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectBidInput } from "../../../../types/projectTypes";

const updateProjectBid = (parent: any, args: Record<string, UpdateProjectBidInput>, context: any, info: any) => {
  
  return updateProjectBidApi(args);
};

export default updateProjectBid;