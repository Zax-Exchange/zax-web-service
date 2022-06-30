import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import postgres from "postgres";
import { Model } from "sequelize";

class ProjectApiUtils {

  static processProjects = (projects: projectTypes.Project[]): projectTypes.PermissionedProject[] => {
    return projects.map((project: projectTypes.Project) => {
        return {
          ...project,
          permission: enums.ProjectPermission.VIEWER
        }
    });
  };
  

}

export default ProjectApiUtils;