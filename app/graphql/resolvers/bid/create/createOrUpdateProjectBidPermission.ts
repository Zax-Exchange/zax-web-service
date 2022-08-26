import { Transaction } from "sequelize/types";
import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectBidPermissionsInputData } from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates or updates project bid permissions based on userIds list
 * @param data
 * @param transaction
 * @returns boolean
 */
const createOrUpdateProjectBidPermission = async (
  data: UpdateProjectBidPermissionsInputData,
  transaction?: Transaction
): Promise<boolean> => {
  const { userIds, projectId, projectBidId, permission } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;

  try {
    for (let userId of userIds) {
      await project_bid_permissions
        .findOrCreate({
          where: {
            userId,
            projectId,
            projectBidId,
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

export default createOrUpdateProjectBidPermission;
