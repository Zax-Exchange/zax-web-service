import { updateProjectBid as updateProjectBidApi } from "../../../../api/project/updateProjectApis";
import { UpdateProjectBidInput } from "../../../../api/types/update/projectTypes";

const updateProjectBid = (parent: any, args: Record<string, UpdateProjectBidInput>, context: any, info: any) => {
  
  return updateProjectBidApi(args.data);
};

export default updateProjectBid;