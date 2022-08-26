import { DeleteProjectBidPermissionsInput } from "../../../resolvers-types.generated";
import sequelize from "../../../../postgres/dbconnection";

const deleteProjectBidPermissions = async (
  parent: any,
  { data }: { data: DeleteProjectBidPermissionsInput },
  context: any,
  info: any
) => {
  const { userIds, projectBidId } = data;
  const project_bid_permissions = sequelize.models.project_bid_permissions;
  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_bid_permissions.destroy({
          where: {
            userId,
            projectBidId,
          },
          transaction,
        });
      }
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    deleteProjectBidPermissions,
  },
};
