import type { Sequelize } from "sequelize";
import { companies as _companies } from "./companies";
import type { companiesAttributes, companiesCreationAttributes } from "./companies";
import { company_product_types as _company_product_types } from "./company_product_types";
import type { company_product_typesAttributes, company_product_typesCreationAttributes } from "./company_product_types";
import { plan_types as _plan_types } from "./plan_types";
import type { plan_typesAttributes, plan_typesCreationAttributes } from "./plan_types";
import { product_types as _product_types } from "./product_types";
import type { product_typesAttributes, product_typesCreationAttributes } from "./product_types";
import { project_bid_permissions as _project_bid_permissions } from "./project_bid_permissions";
import type { project_bid_permissionsAttributes, project_bid_permissionsCreationAttributes } from "./project_bid_permissions";
import { project_bids as _project_bids } from "./project_bids";
import type { project_bidsAttributes, project_bidsCreationAttributes } from "./project_bids";
import { project_component_bids as _project_component_bids } from "./project_component_bids";
import type { project_component_bidsAttributes, project_component_bidsCreationAttributes } from "./project_component_bids";
import { project_components as _project_components } from "./project_components";
import type { project_componentsAttributes, project_componentsCreationAttributes } from "./project_components";
import { project_permissions as _project_permissions } from "./project_permissions";
import type { project_permissionsAttributes, project_permissionsCreationAttributes } from "./project_permissions";
import { projects as _projects } from "./projects";
import type { projectsAttributes, projectsCreationAttributes } from "./projects";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _companies as companies,
  _company_product_types as company_product_types,
  _plan_types as plan_types,
  _product_types as product_types,
  _project_bid_permissions as project_bid_permissions,
  _project_bids as project_bids,
  _project_component_bids as project_component_bids,
  _project_components as project_components,
  _project_permissions as project_permissions,
  _projects as projects,
  _users as users,
};

export type {
  companiesAttributes,
  companiesCreationAttributes,
  company_product_typesAttributes,
  company_product_typesCreationAttributes,
  plan_typesAttributes,
  plan_typesCreationAttributes,
  product_typesAttributes,
  product_typesCreationAttributes,
  project_bid_permissionsAttributes,
  project_bid_permissionsCreationAttributes,
  project_bidsAttributes,
  project_bidsCreationAttributes,
  project_component_bidsAttributes,
  project_component_bidsCreationAttributes,
  project_componentsAttributes,
  project_componentsCreationAttributes,
  project_permissionsAttributes,
  project_permissionsCreationAttributes,
  projectsAttributes,
  projectsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const companies = _companies.initModel(sequelize);
  const company_product_types = _company_product_types.initModel(sequelize);
  const plan_types = _plan_types.initModel(sequelize);
  const product_types = _product_types.initModel(sequelize);
  const project_bid_permissions = _project_bid_permissions.initModel(sequelize);
  const project_bids = _project_bids.initModel(sequelize);
  const project_component_bids = _project_component_bids.initModel(sequelize);
  const project_components = _project_components.initModel(sequelize);
  const project_permissions = _project_permissions.initModel(sequelize);
  const projects = _projects.initModel(sequelize);
  const users = _users.initModel(sequelize);

  company_product_types.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(company_product_types, { as: "company_product_types", foreignKey: "companyId"});
  projects.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(projects, { as: "projects", foreignKey: "companyId"});
  users.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(users, { as: "users", foreignKey: "companyId"});
  companies.belongsTo(plan_types, { as: "plan", foreignKey: "planId"});
  plan_types.hasMany(companies, { as: "companies", foreignKey: "planId"});
  company_product_types.belongsTo(product_types, { as: "productType", foreignKey: "productTypeId"});
  product_types.hasMany(company_product_types, { as: "company_product_types", foreignKey: "productTypeId"});
  project_bid_permissions.belongsTo(project_bids, { as: "projectBid", foreignKey: "projectBidId"});
  project_bids.hasMany(project_bid_permissions, { as: "project_bid_permissions", foreignKey: "projectBidId"});
  project_component_bids.belongsTo(project_bids, { as: "projectBid", foreignKey: "projectBidId"});
  project_bids.hasMany(project_component_bids, { as: "project_component_bids", foreignKey: "projectBidId"});
  project_component_bids.belongsTo(project_components, { as: "projectComponent", foreignKey: "projectComponentId"});
  project_components.hasMany(project_component_bids, { as: "project_component_bids", foreignKey: "projectComponentId"});
  project_bids.belongsTo(projects, { as: "project", foreignKey: "projectId"});
  projects.hasMany(project_bids, { as: "project_bids", foreignKey: "projectId"});
  project_components.belongsTo(projects, { as: "project", foreignKey: "projectId"});
  projects.hasMany(project_components, { as: "project_components", foreignKey: "projectId"});
  project_permissions.belongsTo(projects, { as: "project", foreignKey: "projectId"});
  projects.hasMany(project_permissions, { as: "project_permissions", foreignKey: "projectId"});
  project_bid_permissions.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(project_bid_permissions, { as: "project_bid_permissions", foreignKey: "userId"});
  project_bids.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(project_bids, { as: "project_bids", foreignKey: "userId"});
  project_permissions.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(project_permissions, { as: "project_permissions", foreignKey: "userId"});
  projects.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(projects, { as: "projects", foreignKey: "userId"});

  return {
    companies: companies,
    company_product_types: company_product_types,
    plan_types: plan_types,
    product_types: product_types,
    project_bid_permissions: project_bid_permissions,
    project_bids: project_bids,
    project_component_bids: project_component_bids,
    project_components: project_components,
    project_permissions: project_permissions,
    projects: projects,
    users: users,
  };
}
