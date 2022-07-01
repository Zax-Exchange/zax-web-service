import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import ProjectApiUtils from "./utils";
import sequelize from "../utils/dbconnection";
import { Op, Model, ModelStatic } from "sequelize";

// allows user to see all projects within permission
const getProjectsWithUserId = async(id: number): Promise<projectTypes.Project[] | [] | Error> => {
  const projects = sequelize.models.projects;
  const project_permissions = sequelize.models.project_permissions;
  try {
    const ownIds = await getIdsByPermission(id, enums.ProjectPermission.OWNER, project_permissions, "projectId");
    const viewIds = await getIdsByPermission(id, enums.ProjectPermission.VIEWER, project_permissions, "projectId");
    const editIds = await getIdsByPermission(id, enums.ProjectPermission.EDITOR, project_permissions, "projectId");

    const userProjects = await projects.findAll({
      where: {
        id: {
          [Op.in]: [...ownIds, ...viewIds, ...editIds]
        }
      }
    })
    const res: projectTypes.Project[] = [];
    userProjects.forEach((project) => {
      res.push(project.get({ plain: true }));
    })
    return res;
  } catch (e) {
    return Promise.reject(e)
  }
};

// get projectIds/projectBidIds by user permission
const getIdsByPermission = async(userId: number, permission: enums.ProjectPermission, model: ModelStatic<Model<any, any>>, attr: string): Promise<number[]> => {

  try {
    return await model.findAll({
      attributes: [attr],
      where: {
        userId,
        permission
      }
    }).then(data => data.map(row => row.getDataValue(attr)));
  } catch (e) {
    return Promise.reject(e);
  }
}
const getProjectPermission = async(userId: number, projectId: number): Promise<enums.ProjectPermission | null | Error> => {
  const project_permissions = sequelize.models.project_permissions;
  try {
    const permission = await project_permissions.findOne({
      attributes: ["permission"],
      where: {
        userId,
        projectId
      }
    });
    const res = permission?.get().permission;
    console.log(res)
    return Promise.resolve(res);
  } catch(e) {
    return Promise.reject(e)
  }
};


// get specific project with user permission
const getProjectWithProjectId = async(data: projectTypes.getProjectWithProjectIdInput): Promise<projectTypes.PermissionedProject | Error> => {
  const projects = sequelize.models.projects;
  
  const {userId, projectId } = data;
  try {
    getProjectPermission(userId, projectId);
    const project = await projects.findOne({
      where: {
        id: projectId
      }
    });
    return project?.get({ plain: true });
  } catch (e) {
    
    return Promise.reject(e);
  }
};

//TODO: implement varius getProjectBids emthods
const getProjectBidByUserId = async(id: number): Promise<projectTypes.PermissionedProjectBid[] | [] | Error> => {
  const project_bids = sequelize.models.project_bids;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  try {
    const ownIds = await getIdsByPermission(id, enums.ProjectPermission.OWNER, project_bid_permissions, "projectBidId");
    const viewIds = await getIdsByPermission(id, enums.ProjectPermission.VIEWER, project_bid_permissions, "projectBidId");
    const editIds = await getIdsByPermission(id, enums.ProjectPermission.EDITOR, project_bid_permissions, "projectBidId");

    let userProjectBids: any = await project_bids.findAll({
      where: {
        id: {
          [Op.in]: [...ownIds, ...viewIds, ...editIds]
        }
      }
    })

    userProjectBids = userProjectBids.map((project: any) => {
      return project.get({ plain: true });
    })

return []
    // return Promise.resolve(ProjectApiUtils.processProjectBids(userProjects)); 
  } catch (e) {
    return Promise.reject(e)
  }
}

export {
  getProjectsWithUserId,
  getProjectWithProjectId
}