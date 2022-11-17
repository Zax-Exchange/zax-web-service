import { bid_remarks } from "../../../../models/bid_remarks";
import {
  project_bids,
  project_bidsAttributes,
} from "../../../../models/project_bids";
import sequelize from "../../../../postgres/dbconnection";
import {
  BidStatus,
  GetProjectBidInput,
  ProjectBid,
  ProjectBidComponent,
} from "../../../resolvers-types.generated";

const getProjectBid = async (
  parent: any,
  { data }: { data: GetProjectBidInput },
  context: any
): Promise<ProjectBid | null> => {
  const { companyId, projectId } = data;
  try {
    const [bid, remarkFile] = await Promise.all([
      sequelize.models.project_bids.findOne({
        where: {
          companyId,
          projectId,
        },
      }),
      sequelize.models.bid_remarks.findOne({
        where: {
          projectId,
        },
      }),
    ]);

    if (!bid) return null;

    const components = await (bid as project_bids)
      .getProject_bid_components()
      .then((comps) =>
        comps.map((comp) => comp.get({ plain: true }) as ProjectBidComponent)
      );
    const file = remarkFile?.get({ plain: true }) as bid_remarks;

    return {
      ...(bid.get({ plain: true }) as ProjectBid),
      components,
      remarkFile: file
        ? {
            fileId: file.id,
            filename: file.fileName,
            url: file.url,
          }
        : null,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getProjectBid,
  },
};
