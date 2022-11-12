import sequelize from "../../../../../postgres/dbconnection";
import { GetAllPendingJoinRequestsInput } from "../../../../resolvers-types.generated";

const getAllPendingJoinRequests = async (
  parents: any,
  { data }: { data: GetAllPendingJoinRequestsInput },
  context: any
) => {
  const { companyId } = data;

  try {
    return await sequelize.models.pending_join_requests
      .findAll({
        where: {
          companyId,
        },
      })
      .then((pendingRequests) =>
        pendingRequests.map((r) => r.get("email") as string)
      );
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getAllPendingJoinRequests,
  },
};
