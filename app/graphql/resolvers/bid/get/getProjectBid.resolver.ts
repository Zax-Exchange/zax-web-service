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
) => {
  const { companyId, projectId } = data;
  try {
    const bid = await sequelize.models.project_bids.findOne({
      where: {
        companyId,
        projectId,
      },
    });

    if (!bid) return null;

    const components = await (bid as project_bids)
      .getProject_bid_components()
      .then((comps) =>
        comps.map((comp) => comp.get({ plain: true }) as ProjectBidComponent)
      );

    return {
      ...(bid.get({ plain: true }) as ProjectBid),
      components,
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
