import { Op } from "sequelize";
import { bid_remarks } from "../../../../db/models/bid_remarks";
import {
  project_bids,
  project_bidsAttributes,
} from "../../../../db/models/project_bids";
import sequelize from "../../../../postgres/dbconnection";
import CompanyApiUtils from "../../../../utils/companyUtils";
import {
  BidStatus,
  GetProjectBidsForPoInput,
  ProjectBid,
  ProjectBidComponent,
  ProjectBidForPo,
} from "../../../resolvers-types.generated";

const getProjectBidsForPo = async (
  parent: any,
  { data }: { data: GetProjectBidsForPoInput },
  context: any
): Promise<ProjectBidForPo[]> => {
  const { projectId } = data;
  try {
    const bids = (await sequelize.models.project_bids.findAll({
      where: {
        projectId,
        status: {
          [Op.or]: [BidStatus.Open, BidStatus.Accepted, BidStatus.Outdated],
        },
      },
    })) as project_bids[];

    return await Promise.all(
      bids.map(async (bid) => {
        const company = await CompanyApiUtils.getCompanyWithCompanyId(
          bid.companyId
        );

        return {
          projectBidId: bid.id,
          companyId: company.id,
          companyName: company.name,
        } as ProjectBidForPo;
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  Query: {
    getProjectBidsForPo,
  },
};
