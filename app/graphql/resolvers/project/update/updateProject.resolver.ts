import sequelize from "../../../../postgres/dbconnection";
import streamService from "../../../../stream/StreamService";
import {
  BidStatus,
  UpdateProjectInput,
} from "../../../resolvers-types.generated";

// TODO: broadcast update project even to vendors
const updateProject = async (
  parent: any,
  { data }: { data: UpdateProjectInput },
  context: any,
  info: any
) => {
  const {
    projectId,
    name,
    category,
    totalWeight,
    deliveryAddress,
    deliveryDate,
    targetPrice,
    orderQuantities,
  } = data;
  try {
    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        sequelize.models.projects.update(
          {
            name,
            category,
            totalWeight,
            deliveryAddress,
            deliveryDate,
            targetPrice,
            orderQuantities,
          },
          {
            where: {
              id: projectId,
            },
            transaction,
          }
        ),
        sequelize.models.project_bids.update(
          {
            status: BidStatus.Outdated,
          },
          {
            where: {
              projectId,
            },
            transaction,
          }
        ),
      ]);
    });
    streamService.broadcastProjectUpdate(data.projectId);
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    updateProject,
  },
};
