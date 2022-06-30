import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import ProjectApiUtils from "./utils";
import sequelize from "../utils/dbconnection";
import { Op } from "sequelize";



const getProjectsWithUserId = async(id: number): Promise<projectTypes.Project[] | [] | any> => {
  const projects = sequelize.models.projects;

  try {
    const ownIds = await getProjectIdsByPermission(id, enums.ProjectPermission.OWNER);
    const viewIds = await getProjectIdsByPermission(id, enums.ProjectPermission.VIEWER);
    const editIds = await getProjectIdsByPermission(id, enums.ProjectPermission.EDITOR);

    const userProjects = await projects.findAll({
      where: {
        id: {
          [Op.in]: [...ownIds, ...viewIds, ...editIds]
        }
      }
    })

    return Promise.resolve(ProjectApiUtils.processProjects(userProjects)); 
  } catch (e) {
    return Promise.reject(e)
  }
};

const getProjectIdsByPermission = async(userId: number, permission: enums.ProjectPermission): Promise<number[]> => {
  const project_permissions = sequelize.models.project_permissions;
  try {
    return await project_permissions.findAll({
      attributes: ["projectId"],
      where: {
        userId,
        permission
      }
    }).then(data => data.map(row => row.getDataValue("projectId")));
  } catch (e) {
    return Promise.reject(e);
  }
}
const getProjectWithProjectId = async(data: projectTypes.getProjectWithProjectIdInput) => {
  const projects = sequelize.models.projects;
  const {userId, projectId } = data;
  try {
    const project = await projects.findOne({
      where: {
        id: projectId
      }
    });
    return project
  } catch (e) {
    
    return Promise.resolve(false)
  }
};

export {
  getProjectsWithUserId,
  getProjectWithProjectId
}