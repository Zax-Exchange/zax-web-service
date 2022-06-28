import sql from "../utils/dbconnection";
import * as projectTypes from "../../../types/projectTypes";

const updateProject = async(data: Record<string, projectTypes.UpdateProjectInput>) => {
  const { id, name, deliveryDate, deliveryLocation, budget, design } = data.updateProjectInput;

  try {
    await sql`
      update projects
        set name=${name}, 
          "deliveryDate"=${deliveryDate}, 
          "deliveryLocation"=${deliveryLocation}, 
          budget=${budget}, 
          design=${design}
      where id=${id}
      
    `;
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const updateProjectComponent = async(data: Record<string, projectTypes.UpdateProjectComponentInput>) => {
  const { id, name, materials, dimension, postProcess } = data.updateProjectInput;

  try {
    await sql`
      update project_components
        set name=${name}, 
          materials=${materials}, 
          "postProcess"=${postProcess}, 
          dimension=${dimension}
      where id=${id}
    `;
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

export {
  updateProject,
  updateProjectComponent
}