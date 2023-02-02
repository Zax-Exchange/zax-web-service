import type { Sequelize } from "sequelize";
import { sequelize_meta as _sequelize_meta } from "./SequelizeMeta";
import type {
  sequelize_metaAttributes,
  sequelize_metaCreationAttributes,
} from "./SequelizeMeta";
import { companies as _companies } from "./companies";
import type {
  companiesAttributes,
  companiesCreationAttributes,
} from "./companies";
import { stripe_customers as _stripe_customers } from "./stripe_customers";
import type {
  stripe_customersAttributes,
  stripe_customersCreationAttributes,
} from "./stripe_customers";
import { company_plans as _company_plans } from "./company_plans";
import type {
  company_plansAttributes,
  company_plansCreationAttributes,
} from "./company_plans";
import { customers as _customers } from "./customers";
import type {
  customersAttributes,
  customersCreationAttributes,
} from "./customers";
import { plans as _plans } from "./plans";
import type { plansAttributes, plansCreationAttributes } from "./plans";
import { project_bid_components as _project_bid_components } from "./project_bid_components";
import type {
  project_bid_componentsAttributes,
  project_bid_componentsCreationAttributes,
} from "./project_bid_components";
import { project_bid_permissions as _project_bid_permissions } from "./project_bid_permissions";
import type {
  project_bid_permissionsAttributes,
  project_bid_permissionsCreationAttributes,
} from "./project_bid_permissions";
import { project_bids as _project_bids } from "./project_bids";
import type {
  project_bidsAttributes,
  project_bidsCreationAttributes,
} from "./project_bids";
import { project_components as _project_components } from "./project_components";
import type {
  project_componentsAttributes,
  project_componentsCreationAttributes,
} from "./project_components";
import { project_permissions as _project_permissions } from "./project_permissions";
import type {
  project_permissionsAttributes,
  project_permissionsCreationAttributes,
} from "./project_permissions";
import { projects as _projects } from "./projects";
import { project_changelogs as _project_changelogs } from "./project_changelogs";
import { project_component_changelogs as _project_component_changelogs } from "./project_component_changelogs";
import type {
  projectsAttributes,
  projectsCreationAttributes,
} from "./projects";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";
import { vendors as _vendors } from "./vendors";
import type { vendorsAttributes, vendorsCreationAttributes } from "./vendors";

import { project_designs as _project_designs } from "./project_designs";
import type {
  project_designsAttributes,
  project_designsCreationAttributes,
} from "./project_designs";
import { component_specs as _component_specs } from "./component_specs";
import type {
  component_specsAttributes,
  component_specsCreationAttributes,
} from "./component_specs";

import { pending_join_requests as _pending_join_requests } from "./pending_join_requests";
import type {
  pending_join_requestsAttributes,
  pending_join_requestsCreationAttributes,
} from "./pending_join_requests";
import { bid_remarks as _bid_remarks } from "./bid_remarks";
import type {
  bid_remarksAttributes,
  bid_remarksCreationAttributes,
} from "./bid_remarks";

import { invoices as _invoices } from "./invoices";
import type {
  invoicesAttributes,
  invoicesCreationAttributes,
} from "./invoices";

import { purchase_orders as _purchase_orders } from "./purchase_orders";
import type {
  purchase_ordersAttributes,
  purchase_ordersCreationAttributes,
} from "./purchase_orders";

import { expiring_jwt_tokens as _expiring_jwt_tokens } from "./expiring_jwt_tokens";
import type {
  expiring_jwt_tokensAttributes,
  expiring_jwt_tokensCreationAttributes,
} from "./expiring_jwt_tokens";

export {
  _sequelize_meta as sequelize_meta,
  _companies as companies,
  _stripe_customers as stripe_customers,
  _company_plans as company_plans,
  _customers as customers,
  _plans as plans,
  _project_bid_components as project_bid_components,
  _project_bid_permissions as project_bid_permissions,
  _project_bids as project_bids,
  _project_components as project_components,
  _project_component_changelogs as project_component_changelogs,
  _component_specs as component_specs,
  _project_permissions as project_permissions,
  _projects as projects,
  _project_changelogs as project_changelogs,
  _users as users,
  _vendors as vendors,
  _project_designs as project_designs,
  _pending_join_requests as pending_join_requests,
  _bid_remarks as bid_remarks,
  _invoices as invoices,
  _purchase_orders as purchase_orders,
  _expiring_jwt_tokens as expiring_jwt_tokens,
};

export type {
  sequelize_metaAttributes,
  sequelize_metaCreationAttributes,
  companiesAttributes,
  companiesCreationAttributes,
  stripe_customersAttributes,
  stripe_customersCreationAttributes,
  company_plansAttributes,
  company_plansCreationAttributes,
  customersAttributes,
  customersCreationAttributes,
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
  component_specsAttributes,
  component_specsCreationAttributes,
  project_permissionsAttributes,
  project_permissionsCreationAttributes,
  projectsAttributes,
  projectsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  vendorsAttributes,
  vendorsCreationAttributes,
  project_designsAttributes,
  project_designsCreationAttributes,
  pending_join_requestsAttributes,
  pending_join_requestsCreationAttributes,
  bid_remarksAttributes,
  bid_remarksCreationAttributes,
  invoicesAttributes,
  invoicesCreationAttributes,
  purchase_ordersAttributes,
  purchase_ordersCreationAttributes,
  expiring_jwt_tokensAttributes,
  expiring_jwt_tokensCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const companies = _companies.initModel(sequelize);
  const stripe_customers = _stripe_customers.initModel(sequelize);
  const sequelize_meta = _sequelize_meta.initModel(sequelize);
  const plans = _plans.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const customers = _customers.initModel(sequelize);
  const vendors = _vendors.initModel(sequelize);
  const company_plans = _company_plans.initModel(sequelize);
  const projects = _projects.initModel(sequelize);
  const project_components = _project_components.initModel(sequelize);
  const component_specs = _component_specs.initModel(sequelize);
  const project_bids = _project_bids.initModel(sequelize);
  const project_bid_components = _project_bid_components.initModel(sequelize);
  const project_permissions = _project_permissions.initModel(sequelize);
  const project_bid_permissions = _project_bid_permissions.initModel(sequelize);

  const project_designs = _project_designs.initModel(sequelize);
  const project_changelogs = _project_changelogs.initModel(sequelize);
  const project_component_changelogs =
    _project_component_changelogs.initModel(sequelize);

  const pending_join_requests = _pending_join_requests.initModel(sequelize);
  const bid_remarks = _bid_remarks.initModel(sequelize);

  const invoices = _invoices.initModel(sequelize);
  const purchase_orders = _purchase_orders.initModel(sequelize);

  const expiring_jtw_tokens = _expiring_jwt_tokens.initModel(sequelize);

  company_plans.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  company_plans.belongsTo(stripe_customers, {
    as: "stripe_customer",
    foreignKey: "stripeCustomerId",
    onDelete: "CASCADE",
  });
  stripe_customers.hasOne(company_plans, {
    as: "company_plan",
    foreignKey: "stripeCustomerId",
    onDelete: "CASCADE",
  });
  companies.hasOne(company_plans, {
    as: "company_plan",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  companies.hasOne(stripe_customers, {
    as: "stripe_customer",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  stripe_customers.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  customers.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  companies.hasOne(customers, {
    as: "customer",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  project_bids.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  companies.hasMany(project_bids, {
    as: "project_bids",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  projects.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  companies.hasMany(projects, {
    as: "projects",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  users.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  companies.hasMany(users, {
    as: "users",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  vendors.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  companies.hasOne(vendors, {
    as: "vendor",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  company_plans.belongsTo(plans, {
    as: "plan",
    foreignKey: "planId",
    onDelete: "CASCADE",
  });
  plans.hasMany(company_plans, {
    as: "company_plans",
    foreignKey: "planId",
    onDelete: "CASCADE",
  });
  project_bid_components.belongsTo(project_bids, {
    as: "project_bid",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });
  project_bids.hasMany(project_bid_components, {
    as: "project_bid_components",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });
  project_bid_permissions.belongsTo(project_bids, {
    as: "projectBid",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });
  project_bid_permissions.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  project_bids.hasMany(project_bid_permissions, {
    as: "project_bid_permissions",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });

  project_bid_components.belongsTo(project_components, {
    as: "project_component",
    foreignKey: "projectComponentId",
  });

  project_components.hasMany(project_bid_components, {
    as: "project_bid_components",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });
  project_bids.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  projects.hasMany(project_bids, {
    as: "project_bids",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_components.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  project_components.hasOne(component_specs, {
    as: "component_spec",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });

  project_components.hasMany(project_designs, {
    as: "project_designs",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });
  project_designs.belongsTo(project_components, {
    as: "project_component",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });

  component_specs.belongsTo(project_components, {
    as: "project_component",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });
  projects.hasMany(project_components, {
    as: "project_components",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_permissions.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  projects.hasMany(project_permissions, {
    as: "project_permissions",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  project_bid_permissions.belongsTo(users, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  users.hasMany(project_bid_permissions, {
    as: "project_bid_permissions",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  project_bids.belongsTo(users, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  users.hasMany(project_bids, {
    as: "project_bids",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  project_permissions.belongsTo(users, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  users.hasMany(project_permissions, {
    as: "project_permissions",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  projects.belongsTo(users, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  users.hasMany(projects, {
    as: "projects",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  projects.hasMany(project_designs, {
    as: "project_designs",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });
  project_designs.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_changelogs.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  projects.hasMany(project_changelogs, {
    as: "project_changelogs",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_component_changelogs.belongsTo(project_components, {
    as: "project_component",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });

  project_components.hasMany(project_component_changelogs, {
    as: "project_component_changelogs",
    foreignKey: "projectComponentId",
    onDelete: "CASCADE",
  });

  pending_join_requests.belongsTo(companies, {
    as: "company",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  companies.hasMany(pending_join_requests, {
    as: "pending_join_requests",
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  bid_remarks.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
  });

  bid_remarks.belongsTo(project_bids, {
    as: "project_bid",
    foreignKey: "projectBidId",
  });

  projects.hasMany(bid_remarks, {
    as: "bid_remarks",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_bids.hasOne(bid_remarks, {
    as: "bid_remark",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });

  invoices.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
  });

  invoices.belongsTo(project_bids, {
    as: "project_bid",
    foreignKey: "projectBidId",
  });

  projects.hasMany(invoices, {
    as: "invoices",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_bids.hasOne(invoices, {
    as: "invoice",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });

  purchase_orders.belongsTo(projects, {
    as: "project",
    foreignKey: "projectId",
  });

  purchase_orders.belongsTo(project_bids, {
    as: "project_bid",
    foreignKey: "projectBidId",
  });

  projects.hasMany(purchase_orders, {
    as: "purchase_orders",
    foreignKey: "projectId",
    onDelete: "CASCADE",
  });

  project_bids.hasOne(purchase_orders, {
    as: "purchase_order",
    foreignKey: "projectBidId",
    onDelete: "CASCADE",
  });

  return {
    sequelize_meta,
    companies,
    stripe_customers,
    company_plans,
    customers,
    plans,
    project_bid_components,
    project_bid_permissions,
    project_bids,
    project_components,
    component_specs,
    project_permissions,
    projects,
    users,
    vendors,
    project_designs,
    project_changelogs,
    project_component_changelogs,
    pending_join_requests,
    bid_remarks,
    invoices,
    purchase_orders,
    expiring_jtw_tokens,
  };
}
