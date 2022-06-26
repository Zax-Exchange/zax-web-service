import sql from "../utils/dbconnection.js";

const createProject = ({createProjectInput: data}) => {
  const variables = [data.userId, data.companyId, data.name, data.deliveryDate, data.deliveryLocation, data.budget, data.design];
  return sendQueryWithVars(createProjectQuery, variables);
};

const createProjectBid = ({createProjectBidInput: data}) => {
  const variables = [data.projectId, data.name, data.spec];
  return sendQueryWithVars(createProjectBidQuery, variables);
};

const createProjectComponent = ({createProjectComponent: data}) => {
  const variables = [data.projectId, data.name, data.spec];
  return sendQueryWithVars(createProjectComponentQuery, variables);
};

const createProjectBidComponent = ({createProjectBidComponentInput: data}) => {
  const variables = [data.projectBidId, data.name, data.spec, data.quantityPrices];
  return sendQueryWithVars(createProjectBidComponentQuery, variables);
};

export {
  createProject,
  createProjectBid,
  createProjectComponent,
  createProjectBidComponent
}