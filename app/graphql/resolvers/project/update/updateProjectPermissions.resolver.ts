import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectPermissionsInput } from "../../../resolvers-types.generated";
import createOrUpdateProjectPermission from "../create/createOrUpdateProjectPermission";

const updateProjectPermissions = async (
  parent: any,
  { data }: { data: UpdateProjectPermissionsInput },
  context: any,
  info: any
) => {
  const { viewers, editors } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        createOrUpdateProjectPermission(
          {
            userIds: viewers.userIds,
            projectId: viewers.projectId,
            permission: viewers.permission,
          },
          transaction
        ),
        createOrUpdateProjectPermission(
          {
            userIds: editors.userIds,
            projectId: editors.projectId,
            permission: editors.permission,
          },
          transaction
        ),
      ]);
    });

    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProjectPermissions,
  },
};
