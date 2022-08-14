import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import * as projectTypes from "../types/common/projectTypes";
import ProjectApiUtils from "../utils/projectUtils";
import QueryBuilder from "./queryBuilder";


// search by project materials
const searchCustomerProjects = async (data: projectTypes.SearchProjectInput): Promise<projectTypes.ProjectOverview[]> => {
  try {
    // ProjectDocument -> ProjectOverview -> Project
    //TODO: build query
    const query = QueryBuilder.buildProjectSearchQuery(data);
    const projectDocs = await ElasticProjectService.searchProjectDocuments(query);
    const res: projectTypes.ProjectOverview[] = [];
    const ids = [];
    const idToMaterialsMap: Record<string, string[]> = {};

    for (let project of projectDocs) {

      ids.push(project._id);
      idToMaterialsMap[project._id] = (project._source as any).materials;
    }
    const projects = await ProjectApiUtils.getProjectsByIds(ids);

    for (let project of projects) {
      res.push({
        id: project.id,
        companyId: project.companyId,
        name: project.name,
        deliveryDate: project.deliveryDate,
        deliveryAddress: project.deliveryAddress,
        budget: project.budget,
        materials: idToMaterialsMap[project.id],
        createdAt: project.createdAt
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