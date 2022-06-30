import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import postgres from "postgres";
import { Model } from "sequelize";

class ProjectApiUtils {

  static processProjects = (projects: Model<any, any>[]) => {
     return projects.map((project) => {
        return {
          ...project,
          permission: "viewer"
        }
      })
  };
  

}

export default ProjectApiUtils;