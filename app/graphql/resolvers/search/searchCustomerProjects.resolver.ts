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
    const res: ProjectOverview[] = [];

    for (let project of projectDocs) {
      const proj = await ProjectApiUtils.getProject(project._id);

      if (!proj) continue;
      res.push({
        id: project._id,
        companyName: (project._source as any).companyName,
        companyId: proj.companyId,
        name: proj.name,
        deliveryDate: proj.deliveryDate,
        deliveryAddress: proj.deliveryAddress,
        targetPrice: proj.targetPrice,
        orderQuantities: proj.orderQuantities,
        products: (project._source as any).products,
        createdAt: proj.createdAt,
      });
    }

    return res;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export default {
  Query: { searchCustomerProjects },
};
