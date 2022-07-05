import * as commonProjectTypes from "../../types/common/projectTypes";
import * as getProjectTypes from "../../types/get/projectTypes";
import * as enums from "../../types/common/enums"
import ProjectApiUtils from "./utils";
import UserApiUtils from "../user/utils";
import sequelize from "../utils/dbconnection";
import { Op, Model, ModelStatic, Transaction } from "sequelize";
import { users } from "../models/users";


const getVendorProjects = async(userId:number): Promise<commonProjectTypes.VendorProject[]> => {
  // projectBidPermissions -> projectBidId -> projectBid -> projectId -> project
  try {
    const userModel = sequelize.models.users;
    const projectBidIds = await userModel.findByPk(userId).then(async (user) => {
      return await (user as users).getProject_bid_permissions().then(permissions => permissions.map(p => p.projectBidId));
    });
    const res = [];
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
  try {
    const userModel = sequelize.models.users;
    const projectIds = await userModel.findByPk(userId).then(async (user) => {
      return await (user as users).getProject_permissions().then(permissions => permissions.map(p => p.projectId));
    });

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