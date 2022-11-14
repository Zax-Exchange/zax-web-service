import sequelize from "../../../../../postgres/dbconnection";
import { DeletePendingJoinRequestInput } from "../../../../resolvers-types.generated";

const deletePendingJoinRequest = async (
  parents: any,
  { data }: { data: DeletePendingJoinRequestInput },
  context: any
) => {
  const { userEmail } = data;

  try {
    await sequelize.models.pending_join_requests.destroy({
      where: {
        email: userEmail,
      },
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    deletePendingJoinRequest,
  },
};
