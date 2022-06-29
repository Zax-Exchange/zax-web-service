import sql from "../utils/dbconnection";
import * as projectTypes from "../../types/projectTypes";

const createProject = async(data: Record<string, projectTypes.CreateProjectInput>) => {
  const {userId, name, deliveryDate, deliveryLocation, budget, design, components} = data.createProjectInput;

  try {
    const project = await sql`
      insert into projects
        (name, user_id, delivery_date, delivery_location, budget, design)
      values
        (${name}, ${userId}, ${deliveryDate}, ${deliveryLocation}, ${budget}, ${design})
      returning id
    `;

    await createProjectComponent(project[0].id, components)
   
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const createProjectComponent = async(id: number, components: projectTypes.CreateProjectComponentInput[]) => {
  try {
    for (let component of components) {
      const {name, materials, dimension, postProcess} = component;
      await sql`
        insert into project_components
          (project_id, name, materials, dimension, post_process)
        values
          (${id}, ${name}, ${materials}, ${dimension}, ${postProcess})
      `;
    }
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const createProjectBid = async(data: Record<string, projectTypes.CreateProjectBidInput>) => {
  const { userId, projectId, comments, components } = data.createProjectBidInput;
  try {
    const projectBid = await sql`
      insert into project_bids
        (user_id, project_id, comments)
      values
        (${userId}, ${projectId}, ${comments})
      returning id
    `;
    await createProjectComponentBid(projectBid[0].id, components)
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const createProjectComponentBid = async(projectBidId: number, components: projectTypes.CreateProjectComponentBidInput[]) => {
  
  try {
    for (let component of components) {
      for (let componentBidQuantityPrice of component.componentBidQuantityPrices) {
        const { projectComponentId, quantityPrices } = componentBidQuantityPrice;
        const quantityPricesJson = JSON.stringify(quantityPrices);

        await sql`
        insert into project_component_bids
          (project_bid_id, project_component_id, quantity_prices)
        values
          (${projectBidId}, ${projectComponentId}, ${quantityPricesJson}::json)
      `;
      }
    }
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(false);
  }
};

const createProjectPermission = async(data: Record<string, projectTypes.CreateProjectPermissionInput>) => {
  const { userId, projectId, permission } = data.createProjectPermissionInput;
  try {
    await sql`
      insert into project_permissions
        (user_id, project_id, permission)
      values
        (${userId}, ${projectId}, ${permission})
    `;
    return Promise.resolve(true);
  } catch (e) {
    return Promise.resolve(false);
  }
};

export {
  createProject,
  createProjectBid,
  createProjectComponent,
  createProjectComponentBid,
  createProjectPermission
}