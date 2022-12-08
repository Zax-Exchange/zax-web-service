import sequelize from "../../../../../postgres/dbconnection";
import { DeletePendingJoinRequestInput } from "../../../../resolvers-types.generated";

const deletePendingJoinRequests = async (
  parents: any,
  { data }: { data: DeletePendingJoinRequestInput[] },
  context: any
) => {
  try {
    await Promise.all(
      data.map((input) => {
        const { userEmail } = input;
        return sequelize.models.pending_join_requests.destroy({
          where: {
            email: userEmail,
          },
        });
      })
    );

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Mutation: {
    deletePendingJoinRequests,
  },
};
