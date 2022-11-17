import sequelize from "../../../../postgres/dbconnection";
import {
  BidStatus,
  UpdateProjectBidInput,
} from "../../../resolvers-types.generated";

const updateProjectBid = async (
  parent: any,
  { data }: { data: UpdateProjectBidInput },
  context: any,
  info: any
) => {
  const { projectId, projectBidId, bidRemarkFileId } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        sequelize.models.project_bids.update(
          {
            status: BidStatus.Open,
          },
          {
            where: {
              id: projectBidId,
            },
            transaction,
          }
        ),
        sequelize.models.bid_remarks.update(
          {
            projectId,
            projectBidId,
          },
          {
            where: {
              id: bidRemarkFileId,
            },
            transaction,
          }
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
    updateProjectBid,
  },
};
