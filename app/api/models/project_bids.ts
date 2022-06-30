import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project_bid_permissions, project_bid_permissionsId } from './project_bid_permissions';
import type { project_component_bids, project_component_bidsId } from './project_component_bids';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface project_bidsAttributes {
  id: number;
  userId: number;
  projectId: number;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type project_bidsPk = "id";
export type project_bidsId = project_bids[project_bidsPk];
export type project_bidsOptionalAttributes = "comments" | "createdAt" | "updatedAt";
export type project_bidsCreationAttributes = Optional<project_bidsAttributes, project_bidsOptionalAttributes>;

export class project_bids extends Model<project_bidsAttributes, project_bidsCreationAttributes> implements project_bidsAttributes {
  id!: number;
  userId!: number;
  projectId!: number;
  comments?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // project_bids hasMany project_bid_permissions via projectBidId
  project_bid_permissions!: project_bid_permissions[];
  getProject_bid_permissions!: Sequelize.HasManyGetAssociationsMixin<project_bid_permissions>;
  setProject_bid_permissions!: Sequelize.HasManySetAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  addProject_bid_permission!: Sequelize.HasManyAddAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  addProject_bid_permissions!: Sequelize.HasManyAddAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  createProject_bid_permission!: Sequelize.HasManyCreateAssociationMixin<project_bid_permissions>;
  removeProject_bid_permission!: Sequelize.HasManyRemoveAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  removeProject_bid_permissions!: Sequelize.HasManyRemoveAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  hasProject_bid_permission!: Sequelize.HasManyHasAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  hasProject_bid_permissions!: Sequelize.HasManyHasAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  countProject_bid_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // project_bids hasMany project_component_bids via projectBidId
  project_component_bids!: project_component_bids[];
  getProject_component_bids!: Sequelize.HasManyGetAssociationsMixin<project_component_bids>;
  setProject_component_bids!: Sequelize.HasManySetAssociationsMixin<project_component_bids, project_component_bidsId>;
  addProject_component_bid!: Sequelize.HasManyAddAssociationMixin<project_component_bids, project_component_bidsId>;
  addProject_component_bids!: Sequelize.HasManyAddAssociationsMixin<project_component_bids, project_component_bidsId>;
  createProject_component_bid!: Sequelize.HasManyCreateAssociationMixin<project_component_bids>;
  removeProject_component_bid!: Sequelize.HasManyRemoveAssociationMixin<project_component_bids, project_component_bidsId>;
  removeProject_component_bids!: Sequelize.HasManyRemoveAssociationsMixin<project_component_bids, project_component_bidsId>;
  hasProject_component_bid!: Sequelize.HasManyHasAssociationMixin<project_component_bids, project_component_bidsId>;
  hasProject_component_bids!: Sequelize.HasManyHasAssociationsMixin<project_component_bids, project_component_bidsId>;
  countProject_component_bids!: Sequelize.HasManyCountAssociationsMixin;
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

  static initModel(sequelize: Sequelize.Sequelize): typeof project_bids {
    return sequelize.define('project_bids', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "project_bids_userId_projectId_key"
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      },
      unique: "project_bids_userId_projectId_key"
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'project_bids',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "project_bids_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "project_bids_userId_projectId_key",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "projectId" },
        ]
      },
    ]
  }) as typeof project_bids;
  }
}
