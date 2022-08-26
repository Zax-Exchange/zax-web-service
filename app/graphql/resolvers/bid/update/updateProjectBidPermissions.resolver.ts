import sequelize from "../../../../postgres/dbconnection";
import { UpdateProjectBidPermissionsInput } from "../../../resolvers-types.generated";
import createOrUpdateProjectBidPermission from "../create/createOrUpdateProjectBidPermission";

const updateProjectBidPermissions = async (
  parent: any,
  { data }: { data: UpdateProjectBidPermissionsInput },
  context: any,
  info: any
) => {
  const { viewers, editors } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      Promise.all([
        await createOrUpdateProjectBidPermission(
          {
            userIds: viewers.userIds,
            projectId: viewers.projectId,
            projectBidId: viewers.projectBidId,
            permission: viewers.permission,
          },
          transaction
        ),
        await createOrUpdateProjectBidPermission(
          {
            userIds: editors.userIds,
            projectId: editors.projectId,
            projectBidId: editors.projectBidId,
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
    updateProjectBidPermissions,
  },
};
