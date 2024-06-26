import {
  BID_UPDATE_ROUTE,
  USER_RELOAD_ROUTE,
} from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  BidStatus,
  UpdateProjectBidInput,
} from "../../../resolvers-types.generated";

// TODO: add validation for quantity prices before updating
// customer can update project right before vendor re-submits the bid (when reload event not sent yet)
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
        bidRemarkFileId
          ? sequelize.models.bid_remarks.update(
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
            )
          : null,
      ]);
    });

    const [projectUsers, project] = await Promise.all([
      ProjectApiUtils.getProjectUsers(projectId),
      ProjectApiUtils.getProjectInstance(projectId),
    ]);

    NotificationService.sendNotification(BID_UPDATE_ROUTE, {
      data: {
        message: `app.notification.bid.bidUpdate`,
        projectName: project!.name,
        projectId: project!.id,
      },
      receivers: projectUsers.map((user) => user.userId),
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
