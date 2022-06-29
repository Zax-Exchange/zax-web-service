import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";
import * as enums from "../../types/enums"
import postgres from "postgres";

class ProjectApiUtils {

  static processProjectRows = (pgRows: postgres.RowList<postgres.Row[]>, permission: enums.ProjectPermission) => {
     return pgRows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          deliveryDate: row.delivery_date,
          deliveryLocation: row.delivery_location,
          budget: row.budget,
          design: row.design,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          userId: row.user_id,
          isActive: row.is_active,
          permission: permission
        }
      })
  };
  
  //TODO: review permission field, should this be for customer or vendor?
  static processProjectRow = (row: postgres.Row): projectTypes.Project => {
    return {
      id: row.id,
      name: row.name,
      deliveryDate: row.delivery_date,
      deliveryLocation: row.delivery_location,
      budget: row.budget,
      design: row.design,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      userId: row.user_id,
      isActive: row.is_active,
      permission: enums.ProjectPermission.VIEWER
    }
  }

}

export default ProjectApiUtils;