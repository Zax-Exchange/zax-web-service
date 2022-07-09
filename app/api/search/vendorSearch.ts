import ElasticProjectService from "../../elastic/project/ElasticProjectService";
import * as projectTypes from "../../elastic/types/project";
import project from "../../graphql/types/project";
import ProjectApiUtils from "../utils/projectUtils";
// search by project materials
// search by customer company name
const searchCustomerProjects = async (query: string): Promise<projectTypes.ProjectOverview[]> => {
  try {
    const projectDocs = await ElasticProjectService.searchProjectDocuments(query);
    const res: projectTypes.ProjectOverview[] = [];
    const ids = [];
    const idToMaterialsMap: Record<string, string[]> = {};
    
    console.log("Elast search results: ", projectDocs)
    for (let project of projectDocs) {
      ids.push(parseInt(project._id, 10));
      idToMaterialsMap[project._id] = (project._source as any).materials;
    }
    const projects = await ProjectApiUtils.getProjectsByIds(ids);
    console.log("postgres results:", projects)
    for (let project of projects) {
      res.push({
        id: project.id,
        companyId: project.companyId,
        name: project.name,
        deliveryDate: project.deliveryDate,
        deliveryLocation: project.deliveryLocation,
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
}

export {
  searchCustomerProjects
}