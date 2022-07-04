import * as commonProjectTypes from "../../types/common/projectTypes";
import * as getProjectTypes from "../../types/get/projectTypes";
import * as enums from "../../types/common/enums"
import ProjectApiUtils from "./utils";
import UserApiUtils from "../user/utils";
import sequelize from "../utils/dbconnection";
import { Op, Model, ModelStatic, Transaction } from "sequelize";


const getVendorProjects = async(userId:number): Promise<commonProjectTypes.VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {

    const project_bid_permissions = sequelize.models.project_bid_permissions;
    const res = [];

    const projectBidIds = await ProjectApiUtils.getAllUserProjectOrBidIds(userId, project_bid_permissions, "projectBidId");
    for (let bidId of projectBidIds) {
      const bid = await ProjectApiUtils.getPermissionedProjectBid(userId, bidId);
      const project = await ProjectApiUtils.getPermissionedProject(userId, bid.projectId);
      res.push({
        ...project,
        bidInfo: bid
      });
    }
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e);
  }
};



const getCustomerProjects = async(userId: number): Promise<commonProjectTypes.CustomerProject[]> => {
  const project_permissions = sequelize.models.project_permissions;

  try {
    const projectIds = await ProjectApiUtils.getAllUserProjectOrBidIds(userId, project_permissions, "projectId");
    const res = [];
    for (let projectId of projectIds) {
      const project = await ProjectApiUtils.getPermissionedProject(userId, projectId);
      const bids = await ProjectApiUtils.getPermissionedProjectBids(projectId, userId);
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

export {
  getVendorProjects,
  getCustomerProjects
}