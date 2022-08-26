import sequelize from "../../../../postgres/dbconnection";
import {
  CreateProjectBidComponentInput,
  CreateProjectBidInput,
  ProjectPermission,
  ProjectStatus,
} from "../../../resolvers-types.generated";
import { v4 as uuidv4 } from "uuid";
import createProjectBidComponents from "./createProjectBidComponents";
import ProjectApiUtils from "../../../../utils/projectUtils";
import streamService from "../../../../stream/StreamService";
import createOrUpdateProjectBidPermission from "./createOrUpdateProjectBidPermission";

// Creates a project bid instance associated with projectId in db
const createProjectBid = async (
  parent: any,
  { data }: { data: CreateProjectBidInput },
  context: any,
  info: any
) => {
  const project_bids = sequelize.models.project_bids;
  const { userId, projectId, comments, components } = data;

  try {
    await sequelize.transaction(async (transaction) => {
      const user = await sequelize.models.users.findByPk(userId, {
        transaction,
      });
      const companyId = await user?.getDataValue("companyId");
      const bid = await project_bids.create(
        {
          id: uuidv4(),
          userId,
          companyId,
          projectId,
          comments,
        },
        { transaction }
      );
      const projectBidId = bid.getDataValue("id");
      await createProjectBidComponents(projectBidId, components, transaction);
      await createOrUpdateProjectBidPermission(
        {
          userIds: [userId],
          projectId,
          projectBidId,
          permission: ProjectPermission.Owner,
        },
        transaction
      );
      await ProjectApiUtils.updateProjectStatus(
        projectId,
        ProjectStatus.InProgress
      );
    });
    streamService.broadcastNewBid(data);
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
