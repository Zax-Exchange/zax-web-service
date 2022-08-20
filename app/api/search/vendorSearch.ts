import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import * as projectTypes from "../types/common/projectTypes";
import ProjectApiUtils from "../utils/projectUtils";
import QueryBuilder from "./queryBuilder";


// search by project materials
const searchCustomerProjects = async (data: projectTypes.SearchProjectInput): Promise<projectTypes.ProjectOverview[]> => {
  try {
    // ProjectDocument -> ProjectOverview -> Project
    const query = QueryBuilder.buildProjectSearchQuery(data);
    const projectDocs = await ElasticProjectService.searchProjectDocuments(query);
    const res: projectTypes.ProjectOverview[] = [];

    for (let project of projectDocs) {
      const proj = await ProjectApiUtils.getProject(project._id);
      res.push({
        id: project._id,
        companyName: (project._source as any).companyName,
        companyId: proj.companyId,
        name: proj.name,
        deliveryDate: proj.deliveryDate,
        deliveryAddress: proj.deliveryAddress,
        budget: proj.budget,
        materials: (project._source as any).materials,
        createdAt: proj.createdAt,
      });

    }

    return res;
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export {
  searchCustomerProjects
}