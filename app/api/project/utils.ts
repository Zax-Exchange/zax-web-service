import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import { Model, ModelStatic } from "sequelize";

class ProjectApiUtils {

  static processProjects(projects: projectTypes.Project[]): projectTypes.PermissionedProject[] {
    return projects.map((project: projectTypes.Project) => {
        return {
          ...project,
          permission: enums.ProjectPermission.VIEWER
        }
    });
  };
  

  static async checkProjectEditableByUser(model: ModelStatic<Model<any, any>>, userId: number, projectId: number): Promise<boolean> {
    const permission = await model.findOne({
        where: {
          userId,
          projectId
        }
    });
    if (!permission || 
      (permission.getDataValue("permission") === enums.ProjectPermission.VIEWER)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  static async checkProjectBidEditableByUser(model: ModelStatic<Model<any, any>>, userId: number, projectBidId: number): Promise<boolean> {
    const permission = await model.findOne({
        where: {
          userId,
          projectBidId
        }
    });
    if (!permission || 
      (permission.getDataValue("permission") === enums.ProjectPermission.VIEWER)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}

export default ProjectApiUtils;