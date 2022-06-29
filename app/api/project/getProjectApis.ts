import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import ProjectApiUtils from "./utils";


const getProjectsWithUserId = async(id: number): Promise<projectTypes.Project[] | [] | any> => {
  try {
    const ownedProjects = await sql`
      select * from projects where user_id=${id}
    `;
    const viewableProjects = await sql`
      select * 
      from projects
      where id in  (
        select project_id
        from project_permissions
        where user_id=${id} and permission='viewer'
      )
    `;

    const editableProjects = await sql`
      select * 
      from projects
      where id in  (
        select project_id
        from project_permissions
        where user_id=${id} and permission='editor'
      )
    `;
    const p1 = ProjectApiUtils.processProjectRows(ownedProjects, enums.ProjectPermission.OWNER);
    const p2 = ProjectApiUtils.processProjectRows(viewableProjects, enums.ProjectPermission.VIEWER);
    const p3 = ProjectApiUtils.processProjectRows(editableProjects, enums.ProjectPermission.EDITOR);

    return Promise.resolve([...p1, ...p2, ...p3]);
  } catch (e) {
    return Promise.reject(e)
  }
};

const getProjectWithProjectId = async(id: number) => {
  try {
    const rows = await sql`
      select * from projects where id=${id}
    `;
    const project = ProjectApiUtils.processProjectRow(rows[0]);
    return Promise.resolve(project);
  } catch (e) {
    return Promise.reject(e)
  }
};

export {
  getProjectsWithUserId,
  getProjectWithProjectId
}