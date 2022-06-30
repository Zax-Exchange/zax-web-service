import sequelize from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums";
import { Op } from "sequelize";

const deleteProject = async(data: projectTypes.DeleteProjectInput): Promise<boolean | Error> => {
  const projects = sequelize.models.projects;
  const project_permissions = sequelize.models.project_permissions;

  const { userId, projectId } = data;
  const permission = await project_permissions.findOne({
      where: {
        userId,
        projectId
      }
  });
  if (!permission || permission.getDataValue("permission") !== enums.ProjectPermission.EDITOR) {
    return Promise.resolve(false);
  }

  try {
    await projects.destroy({
      where: {
        id: projectId,
        status: enums.ProjectStatus.ACTIVE
      }
    });
    return Promise.resolve(true);
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};


export {
  deleteProject
}