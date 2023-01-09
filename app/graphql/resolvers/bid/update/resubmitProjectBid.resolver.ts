import { project_bids } from "../../../../models/project_bids";
import { BID_UPDATE_ROUTE } from "../../../../notification/notificationRoutes";
import NotificationService from "../../../../notification/NotificationService";
import sequelize from "../../../../postgres/dbconnection";
import ProjectApiUtils from "../../../../utils/projectUtils";
import {
  BidStatus,
  ResubmitProjectBidInput,
  UpdateProjectBidInput,
} from "../../../resolvers-types.generated";

const resubmitProjectBid = async (
  parent: any,
  { data }: { data: ResubmitProjectBidInput },
  context: any,
  info: any
) => {
  const { projectBidId } = data;
  try {
    const bid = (await sequelize.models.project_bids.findByPk(
      projectBidId
    )) as project_bids;

    const [_, project] = await Promise.all([
      bid.update({
        status: BidStatus.Open,
      }),
      bid.getProject(),
    ]);

    const projectUsers = await ProjectApiUtils.getProjectUsers(project.id);

    NotificationService.sendNotification(BID_UPDATE_ROUTE, {
      data: {
        message: `app.notification.bid.bidUpdate`,
        projectName: project.name,
        projectId: project.id,
      },
      receivers: projectUsers.map((user) => user.userId),
    });
    return true;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    resubmitProjectBid,
  },
};
