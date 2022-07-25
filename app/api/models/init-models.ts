import type { Sequelize } from "sequelize";
import { companies as _companies } from "./companies";
import type { companiesAttributes, companiesCreationAttributes } from "./companies";
import { company_plans as _company_plans } from "./company_plans";
import type { company_plansAttributes, company_plansCreationAttributes } from "./company_plans";
import { customers as _customers } from "./customers";
import type { customersAttributes, customersCreationAttributes } from "./customers";
import { materials as _materials } from "./materials";
import type { materialsAttributes, materialsCreationAttributes } from "./materials";
import { plans as _plans } from "./plans";
import type { plansAttributes, plansCreationAttributes } from "./plans";
import { project_bid_components as _project_bid_components } from "./project_bid_components";
import type { project_bid_componentsAttributes, project_bid_componentsCreationAttributes } from "./project_bid_components";
import { project_bid_permissions as _project_bid_permissions } from "./project_bid_permissions";
import type { project_bid_permissionsAttributes, project_bid_permissionsCreationAttributes } from "./project_bid_permissions";
import { project_bids as _project_bids } from "./project_bids";
import type { project_bidsAttributes, project_bidsCreationAttributes } from "./project_bids";
import { project_components as _project_components } from "./project_components";
import type { project_componentsAttributes, project_componentsCreationAttributes } from "./project_components";
import { project_permissions as _project_permissions } from "./project_permissions";
import type { project_permissionsAttributes, project_permissionsCreationAttributes } from "./project_permissions";
import { projects as _projects } from "./projects";
import type { projectsAttributes, projectsCreationAttributes } from "./projects";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";
import { vendors as _vendors } from "./vendors";
import type { vendorsAttributes, vendorsCreationAttributes } from "./vendors";

export {
  _companies as companies,
  _company_plans as company_plans,
  _customers as customers,
  _materials as materials,
  _plans as plans,
  _project_bid_components as project_bid_components,
  _project_bid_permissions as project_bid_permissions,
  _project_bids as project_bids,
  _project_components as project_components,
  _project_permissions as project_permissions,
  _projects as projects,
  _users as users,
  _vendors as vendors,
};

export type {
  companiesAttributes,
  companiesCreationAttributes,
  company_plansAttributes,
  company_plansCreationAttributes,
  customersAttributes,
  customersCreationAttributes,
  materialsAttributes,
  materialsCreationAttributes,
  plansAttributes,
  plansCreationAttributes,
  project_bid_componentsAttributes,
  project_bid_componentsCreationAttributes,
  project_bid_permissionsAttributes,
  project_bid_permissionsCreationAttributes,
  project_bidsAttributes,
  project_bidsCreationAttributes,
  project_componentsAttributes,
  project_componentsCreationAttributes,
  project_permissionsAttributes,
  project_permissionsCreationAttributes,
  projectsAttributes,
  projectsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  vendorsAttributes,
  vendorsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const companies = _companies.initModel(sequelize);
  const company_plans = _company_plans.initModel(sequelize);
  const customers = _customers.initModel(sequelize);
  const materials = _materials.initModel(sequelize);
  const plans = _plans.initModel(sequelize);
  const project_bid_components = _project_bid_components.initModel(sequelize);
  const project_bid_permissions = _project_bid_permissions.initModel(sequelize);
  const project_bids = _project_bids.initModel(sequelize);
  const project_components = _project_components.initModel(sequelize);
  const project_permissions = _project_permissions.initModel(sequelize);
  const projects = _projects.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const vendors = _vendors.initModel(sequelize);

  company_plans.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasOne(company_plans, { as: "company_plan", foreignKey: "companyId"});
  customers.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(customers, { as: "customers", foreignKey: "companyId"});
  project_bids.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(project_bids, { as: "project_bids", foreignKey: "companyId"});
  projects.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(projects, { as: "projects", foreignKey: "companyId"});
  users.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(users, { as: "users", foreignKey: "companyId"});
  vendors.belongsTo(companies, { as: "company", foreignKey: "companyId"});
  companies.hasMany(vendors, { as: "vendors", foreignKey: "companyId"});
  company_plans.belongsTo(plans, { as: "plan", foreignKey: "planId"});
  plans.hasMany(company_plans, { as: "company_plans", foreignKey: "planId"});
  project_bid_components.belongsTo(project_bids, { as: "projectBid", foreignKey: "projectBidId"});
  project_bids.hasMany(project_bid_components, { as: "project_bid_components", foreignKey: "projectBidId"});
  project_bid_permissions.belongsTo(project_bids, { as: "projectBid", foreignKey: "projectBidId"});
  project_bids.hasMany(project_bid_permissions, { as: "project_bid_permissions", foreignKey: "projectBidId"});
  project_bid_components.belongsTo(project_components, { as: "projectComponent", foreignKey: "projectComponentId"});
  project_components.hasMany(project_bid_components, { as: "project_bid_components", foreignKey: "projectComponentId"});
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
    company_plans: company_plans,
    customers: customers,
    materials: materials,
    plans: plans,
    project_bid_components: project_bid_components,
    project_bid_permissions: project_bid_permissions,
    project_bids: project_bids,
    project_components: project_components,
    project_permissions: project_permissions,
    projects: projects,
    users: users,
    vendors: vendors,
  };
}
