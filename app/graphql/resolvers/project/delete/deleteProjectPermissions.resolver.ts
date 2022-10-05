import sequelize from "../../../../postgres/dbconnection";
import { DeleteProjectPermissionsInput } from "../../../resolvers-types.generated";

const deleteProjectPermissions = async (
  parent: any,
  { data }: { data: DeleteProjectPermissionsInput },
  context: any,
  info: any
) => {
  const { userIds, projectId } = data;
  const project_permissions = sequelize.models.project_permissions;

  try {
    await sequelize.transaction(async (transaction) => {
      for (let userId of userIds) {
        await project_permissions.destroy({
          where: {
            userId,
            projectId,
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
  Mutation: { deleteProjectPermissions },
};
