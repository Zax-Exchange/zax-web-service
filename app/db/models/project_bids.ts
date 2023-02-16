import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { companies, companiesId } from "./companies";
import type {
  project_bid_components,
  project_bid_componentsId,
} from "./project_bid_components";
import type {
  project_bid_permissions,
  project_bid_permissionsId,
} from "./project_bid_permissions";
import type { projects, projectsId } from "./projects";
import type { users, usersId } from "./users";
import { BidStatus } from "../../graphql/resolvers-types.generated";
import { bid_remarks } from "./bid_remarks";
import { invoices } from "./invoices";
import { purchase_orders } from "./purchase_orders";

export interface project_bidsAttributes {
  id: string;
  userId: string;
  projectId: string;
  companyId: string;
  status: BidStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type project_bidsPk = "id";
export type project_bidsId = project_bids[project_bidsPk];
export type project_bidsOptionalAttributes = "createdAt" | "updatedAt";
export type project_bidsCreationAttributes = Optional<
  project_bidsAttributes,
  project_bidsOptionalAttributes
>;

export class project_bids
  extends Model<project_bidsAttributes, project_bidsCreationAttributes>
  implements project_bidsAttributes
{
  id!: string;
  userId!: string;
  projectId!: string;
  companyId!: string;
  status!: BidStatus;
  createdAt!: Date;
  updatedAt!: Date;

  // project_bids belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // project_bids hasMany project_bid_components via projectBidId
  project_bid_components!: project_bid_components[];
  getProject_bid_components!: Sequelize.HasManyGetAssociationsMixin<project_bid_components>;
  setProject_bid_components!: Sequelize.HasManySetAssociationsMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  addProject_bid_component!: Sequelize.HasManyAddAssociationMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  addProject_bid_components!: Sequelize.HasManyAddAssociationsMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  createProject_bid_component!: Sequelize.HasManyCreateAssociationMixin<project_bid_components>;
  removeProject_bid_component!: Sequelize.HasManyRemoveAssociationMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  removeProject_bid_components!: Sequelize.HasManyRemoveAssociationsMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  hasProject_bid_component!: Sequelize.HasManyHasAssociationMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  hasProject_bid_components!: Sequelize.HasManyHasAssociationsMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  countProject_bid_components!: Sequelize.HasManyCountAssociationsMixin;
  // project_bids hasMany project_bid_permissions via projectBidId
  project_bid_permissions!: project_bid_permissions[];
  getProject_bid_permissions!: Sequelize.HasManyGetAssociationsMixin<project_bid_permissions>;
  setProject_bid_permissions!: Sequelize.HasManySetAssociationsMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  addProject_bid_permission!: Sequelize.HasManyAddAssociationMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  addProject_bid_permissions!: Sequelize.HasManyAddAssociationsMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  createProject_bid_permission!: Sequelize.HasManyCreateAssociationMixin<project_bid_permissions>;
  removeProject_bid_permission!: Sequelize.HasManyRemoveAssociationMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  removeProject_bid_permissions!: Sequelize.HasManyRemoveAssociationsMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  hasProject_bid_permission!: Sequelize.HasManyHasAssociationMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  hasProject_bid_permissions!: Sequelize.HasManyHasAssociationsMixin<
    project_bid_permissions,
    project_bid_permissionsId
  >;
  countProject_bid_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // project_bids belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // project_bids belongsTo users via userId
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // project_bids hasOne bid_remarks via projectBidId
  bid_remark!: bid_remarks | null;
  getBid_remark!: Sequelize.HasOneGetAssociationMixin<bid_remarks | null>;

  // project_bids hasOne invoices via projectId
  invoice!: invoices | null;
  getInvoice!: Sequelize.HasOneGetAssociationMixin<invoices | null>;

  // project_bids hasOne purchase_orders via projectId
  purchase_order!: purchase_orders | null;
  getPurchase_order!: Sequelize.HasOneGetAssociationMixin<purchase_orders | null>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_bids {
    return sequelize.define(
      "project_bids",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "companies",
            key: "id",
          },
          unique: "project_bids_projectId_companyId_key",
          onDelete: "cascade",
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
            key: "id",
          },
          unique: "project_bids_projectId_companyId_key",
          onDelete: "cascade",
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "project_bids",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        hooks: {
          // afterDestroy: async (instance, options) => {
          //   await instance.getProject_bid_components().then(async comps => {
          //     for (let comp of comps) await comp.destroy()
          //   });
          //   await instance.getProject_bid_permissions().then(async ps => {
          //     for (let p of ps) await p.destroy()
          //   })
          // }
        },
        indexes: [
          {
            name: "project_bids_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "project_bids_projectId_companyId_key",
            unique: true,
            fields: [{ name: "projectId" }, { name: "companyId" }],
          },
        ],
      }
    ) as typeof project_bids;
  }
}
