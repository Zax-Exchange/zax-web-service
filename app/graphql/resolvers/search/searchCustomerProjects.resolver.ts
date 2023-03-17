import sequelize from "../../../postgres/dbconnection";
import { SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";
import ElasticProjectService from "../../../elastic/project/ElasticProjectService";
import { project_bids } from "../../../db/models/project_bids";
import ProjectApiUtils from "../../../utils/projectUtils";
import {
  ProjectBidInfo,
  CustomerProjectSearchResult,
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
    const res: CustomerProjectSearchResult = {
      hits: [],
      totalHits: 0
    };

    // ProjectDocument -> ProjectOverview -> Project
    const query = QueryBuilder.buildProjectSearchQuery(data);
    const searchResult = await ElasticProjectService.searchProjectDocuments(
      query,
      data.from?.valueOf(),
      data.size?.valueOf()
    );

    res.totalHits = (searchResult.total as SearchTotalHits).value;
    for (const projectDoc of searchResult.hits) {
      const proj = await ProjectApiUtils.getProjectInstance(projectDoc._id);
      const userCompanyId = await UserApiUtils.getUserCompanyId(data.userId);
      const bidInfo = await hasProjectBids(projectDoc._id, userCompanyId);
      if (proj) {
        res.hits.push({
          id: projectDoc._id,
          name: proj.name,
          category: proj.category,
          deliveryDate: proj.deliveryDate,
          deliveryAddress: proj.deliveryAddress,
          targetPrice: proj.targetPrice,
          orderQuantities: proj.orderQuantities,
          products: (projectDoc._source as any).products,
          createdAt: proj.createdAt,
          bidInfo
        } as SearchResultProjectOverview;
      }
    }  
    return res as CustomerProjectSearchResult;
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
