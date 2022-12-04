import sequelize from "../../../../postgres/dbconnection";
import {
  BidStatus,
  CreateProjectBidComponentInput,
  CreateProjectBidInput,
  ProjectPermission,
  ProjectStatus,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import ProjectApiUtils from "../../../../utils/projectUtils";
import createOrUpdateProjectBidPermission from "./createOrUpdateProjectBidPermission";
import NotificationService from "../../../../notification/NotificationService";
import { BID_CREATE_ROUTE } from "../../../../notification/notificationRoutes";

// Creates a project bid instance associated with projectId in db
const createProjectBid = async (
  parent: any,
  { data }: { data: CreateProjectBidInput },
  context: any,
  info: any
) => {
  const project_bids = sequelize.models.project_bids;
  const { userId, projectId, components, bidRemarkFileId } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      const user = await sequelize.models.users.findByPk(userId, {
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const projectBidId = uuidv4();

      await project_bids.create(
        {
          id: projectBidId,
          userId,
          companyId,
          projectId,
          status: BidStatus.Open,
        },
        { transaction }
      );

      await Promise.all([
        ...components.map(async (comp) => {
          const {
            projectComponentId,
            quantityPrices,
            samplingFee,
            toolingFee,
          } = comp;
          return sequelize.models.project_bid_components.create(
            {
              id: uuidv4(),
              projectBidId,
              projectComponentId,
              quantityPrices,
              samplingFee,
              toolingFee,
            },
            { transaction }
          );
        }),
        sequelize.models.bid_remarks.update(
          {
            projectId,
            projectBidId,
          },
          { where: { id: bidRemarkFileId }, transaction }
        ),
        createOrUpdateProjectBidPermission(
          {
            userIds: [userId],
            projectId,
            projectBidId,
            permission: ProjectPermission.Owner,
          },
          transaction
        ),
        ProjectApiUtils.updateProjectStatus(
          projectId,
          ProjectStatus.InProgress,
          transaction
        ),
      ]);
    });

    Promise.all([
      ProjectApiUtils.getProjectUsers(projectId),
      ProjectApiUtils.getProjectInstance(projectId),
    ]).then(([users, project]) => {
      if (!users.length || !project) return;

      NotificationService.sendNotification(BID_CREATE_ROUTE, {
        receivers: users.map((u) => u.userId),
        data: {
          message: `New bid for ${project?.name}`,
          projectId: project?.id,
        },
      });
    });
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Mutation: {
    createProjectBid,
  },
};
