import * as commonProjectTypes from "../types/common/projectTypes";
import * as enums from "../types/common/enums"
import ProjectApiUtils from "../utils/projectUtils";

const getVendorProjects = async(userId:number): Promise<commonProjectTypes.VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {
    const permissions = await ProjectApiUtils.getBidPermissions(userId);

    const res = [];
    for (let permission of permissions) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(permission.projectBidId, permission.permission as enums.ProjectPermission);
      const project = await ProjectApiUtils.getPermissionedProject(userId, bid.projectId);
      res.push({
        ...project,
        bidInfo: bid
      });
    }

    return res;
  } catch(e) {
    return Promise.reject(e);
  }
};



const getCustomerProjects = async(userId: number): Promise<commonProjectTypes.CustomerProject[]> => {
  try {
    const projectPermissions = await ProjectApiUtils.getProjectPermissions(userId);

    const res = [];
    for (let permission of projectPermissions) {
      const project = await ProjectApiUtils.getPermissionedProject(userId, permission.projectId, permission.permission as enums.ProjectPermission);
      const bids = await ProjectApiUtils.getPermissionedProjectBids(permission.projectId);
      res.push({
        ...project,
        bids
      });
    }
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e);
  }
};

const getProjectDetail = async(id: number): Promise<commonProjectTypes.Project> => {
  try {
    return await ProjectApiUtils.getProject(id);
  } catch(e) {
    return Promise.reject(e);
  }
};

export {
  getVendorProjects,
  getCustomerProjects,
  getProjectDetail
}