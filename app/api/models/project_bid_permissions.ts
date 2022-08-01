import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project_bids, project_bidsId } from './project_bids';
import type { users, usersId } from './users';

export interface project_bid_permissionsAttributes {
  id: string;
  projectBidId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  permission: string;
}

export type project_bid_permissionsPk = "id";
export type project_bid_permissionsId = project_bid_permissions[project_bid_permissionsPk];
export type project_bid_permissionsOptionalAttributes = "createdAt" | "updatedAt";
export type project_bid_permissionsCreationAttributes = Optional<project_bid_permissionsAttributes, project_bid_permissionsOptionalAttributes>;

export class project_bid_permissions extends Model<project_bid_permissionsAttributes, project_bid_permissionsCreationAttributes> implements project_bid_permissionsAttributes {
  id!: string;
  projectBidId!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  permission!: string;

  // project_bid_permissions belongsTo project_bids via projectBidId
  projectBid!: project_bids;
  getProjectBid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  setProjectBid!: Sequelize.BelongsToSetAssociationMixin<project_bids, project_bidsId>;
  createProjectBid!: Sequelize.BelongsToCreateAssociationMixin<project_bids>;
  // project_bid_permissions belongsTo users via userId
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_bid_permissions {
    return sequelize.define('project_bid_permissions', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    projectBidId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'project_bids',
        key: 'id'
      },
      unique: "project_bid_editors_userId_projectBidId_key",
      onDelete: 'cascade'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "project_bid_editors_userId_projectBidId_key",
      onDelete: 'cascade'
    },
    permission: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'project_bid_permissions',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "project_bid_editors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "project_bid_editors_userId_projectBidId_key",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "projectBidId" },
        ]
      },
    ]
  }) as typeof project_bid_permissions;
  }
}
