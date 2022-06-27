import sql from "../utils/dbconnection";

const createProject = async(data: any) => {
  const {owner, name, deliveryDate, deliveryLocation, budget, design=null} = data.createProjectInput;
  try {
    await sql`
      insert into projects
        (name, owner, "deliveryDate", "deliveryLocation", budget, design)
      values
        (${name}, ${owner}, ${deliveryDate}, ${deliveryLocation}, ${budget}, ${design})
    `;
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.resolve(false);
  }
};

const createProjectBid = (data: any) => {
  const variables = [data.projectId, data.name, data.spec];
  return true
};

const createProjectComponent = (data: any) => {
  const variables = [data.projectId, data.name, data.spec];
 return true
};

const createProjectBidComponent = (data: any) => {
  const variables = [data.projectBidId, data.name, data.spec, data.quantityPrices];
  return true
};

export {
  createProject,
  createProjectBid,
  createProjectComponent,
  createProjectBidComponent
}