import sequelize from "../../../postgres/dbconnection";
import ElasticProjectService from "../../../elastic/project/ElasticProjectService";
import { project_bids } from "../../../db/models/project_bids";
import ProjectApiUtils from "../../../utils/projectUtils";
import {
  ProjectBidInfo,
  ProjectOverview,
  SearchCustomerProjectInput,
  SearchResultProjectOverview,
} from "../../resolvers-types.generated";
import QueryBuilder from "./queryBuilder/queryBuilder";
import UserApiUtils from "../../../utils/userUtils";
const searchCustomerProjects = async (
  parent: any,
  { data }: { data: SearchCustomerProjectInput },
  context: any
) => {
  try {
    // ProjectDocument -> ProjectOverview -> Project
    const query = QueryBuilder.buildProjectSearchQuery(data);
    const projectDocs = await ElasticProjectService.searchProjectDocuments(
      query
    );
    const projectOverviews = await Promise.all(
      projectDocs.map(async (project) => {
        const proj = await ProjectApiUtils.getProjectInstance(project._id);
        const userCompanyId = await UserApiUtils.getUserCompanyId(data.userId);
        const bidInfo = await hasProjectBids(project._id, userCompanyId);

        if (!proj) return null;

        return {
          id: project._id,
          name: proj.name,
          category: proj.category,
          deliveryDate: proj.deliveryDate,
          deliveryAddress: proj.deliveryAddress,
          targetPrice: proj.targetPrice,
          orderQuantities: proj.orderQuantities,
          products: (project._source as any).products,
          createdAt: proj.createdAt,
          bidInfo
        } as ProjectOverview;
      })
    );

    const res = projectOverviews.filter((overview) => !!overview);

    return res as SearchResultProjectOverview[];
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

async function hasProjectBids (projectId: string, companyId: string): Promise<ProjectBidInfo> {
  const bids = (await sequelize.models.project_bids.findAll({
    where: {
      projectId,
    },
  })) as project_bids[];
  
  const result: ProjectBidInfo = {
    hasBids: false,
    biddedByUserCompany: false,
  }

  if (bids.length > 0) {
    result.hasBids = true;
    if (bids.find((bid: project_bids) => bid.companyId == companyId) != undefined) {
      result.biddedByUserCompany = true;
    }
  }
  return result;
}

export default {
  Query: { searchCustomerProjects },
};
