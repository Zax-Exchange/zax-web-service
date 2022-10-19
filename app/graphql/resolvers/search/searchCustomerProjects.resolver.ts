import ElasticProjectService from "../../../elastic/project/ElasticProjectService";
import ProjectApiUtils from "../../../utils/projectUtils";
import {
  ProjectOverview,
  SearchCustomerProjectInput,
} from "../../resolvers-types.generated";
import QueryBuilder from "./queryBuilder/queryBuilder";
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

        if (!proj) return null;

        return {
          id: project._id,
          companyName: (project._source as any).companyName,
          companyId: proj.companyId,
          name: proj.name,
          category: proj.category,
          deliveryDate: proj.deliveryDate,
          deliveryAddress: proj.deliveryAddress,
          targetPrice: proj.targetPrice,
          orderQuantities: proj.orderQuantities,
          products: (project._source as any).products,
          createdAt: proj.createdAt,
        } as ProjectOverview;
      })
    );

    const res = projectOverviews.filter((overview) => !!overview);

    return res;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Query: { searchCustomerProjects },
};
