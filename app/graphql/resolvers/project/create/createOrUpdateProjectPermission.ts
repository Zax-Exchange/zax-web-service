import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectPermissionsInputData } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates or updates project permissions based on userIds list
 * @param data
 * @param transaction
 * @returns boolean
 */
const createOrUpdateProjectPermission = async (
  data: UpdateProjectPermissionsInputData,
  transaction?: Transaction
): Promise<boolean> => {
  const { userIds, projectId, permission } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    for (let userId of userIds) {
      await project_permissions
        .findOrCreate({
          where: {
            userId,
            projectId,
          },
          defaults: {
            id: uuidv4(),
            permission,
          },
          transaction,
        })
        .then(async ([foundPermission, created]) => {
          if (!created) {
            await foundPermission.update(
              { permission: permission },
              { transaction }
            );
          }
        });
    }
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default createOrUpdateProjectPermission;
