import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";

const updateProject = async(data: Record<string, projectTypes.UpdateProjectInput>) => {
  const { id, name, deliveryDate, deliveryLocation, budget, design, components } = data.updateProjectInput;

  try {
    await sql`
      update projects
        set name=${name}, 
          delivery_date=${deliveryDate}, 
          delivery_location=${deliveryLocation}, 
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

const updateProjectComponent = async(components: projectTypes.UpdateProjectComponentInput[]) => {
  
  try {
    for (let component of components) {
      const { id, name, materials, dimension, postProcess } = component;
        await sql`
          update project_components
            set name=${name}, 
              materials=${materials}, 
              post_process=${postProcess}, 
              dimension=${dimension}
          where id=${id}
        `;
      }
      return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const updateProjectBid = async(data: Record<string, projectTypes.UpdateProjectBidInput>) => {
  const { id, comments, components } = data.updateProjectBidInput;
  try {
    await sql`
      update project_bids
        set comments=${comments}
      where id=${id}
    `;
    await updateProjectComponentBid(components);
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const updateProjectComponentBid = async(components: projectTypes.UpdateProjectComponentBidInput[]) => {
  try {
    for (let component of components) {
      const { id, quantityPrices } = component;
      const qp = JSON.stringify(quantityPrices);
      await sql`
        update project_component_bids
          set quantity_prices=${qp}
        where id=${id}
      `;
    }
    Promise.resolve(true);
  } catch (e) {
    console.error(e);
    Promise.reject(e); 
  }
};

export {
  updateProject,
  updateProjectComponent,
  updateProjectBid,
  updateProjectComponentBid
}