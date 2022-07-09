import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project_bids, project_bidsId } from './project_bids';
import type { project_components, project_componentsId } from './project_components';

export interface project_bid_componentsAttributes {
  id: number;
  projectBidId: number;
  projectComponentId: number;
  quantityPrices: object;
  createdAt: Date;
  updatedAt: Date;
}

export type project_bid_componentsPk = "id";
export type project_bid_componentsId = project_bid_components[project_bid_componentsPk];
export type project_bid_componentsOptionalAttributes = "createdAt" | "updatedAt";
export type project_bid_componentsCreationAttributes = Optional<project_bid_componentsAttributes, project_bid_componentsOptionalAttributes>;

export class project_bid_components extends Model<project_bid_componentsAttributes, project_bid_componentsCreationAttributes> implements project_bid_componentsAttributes {
  id!: number;
  projectBidId!: number;
  projectComponentId!: number;
  quantityPrices!: object;
  createdAt!: Date;
  updatedAt!: Date;

  // project_bid_components belongsTo project_bids via projectBidId
  projectBid!: project_bids;
  getProjectBid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  setProjectBid!: Sequelize.BelongsToSetAssociationMixin<project_bids, project_bidsId>;
  createProjectBid!: Sequelize.BelongsToCreateAssociationMixin<project_bids>;
  // project_bid_components belongsTo project_components via projectComponentId
  projectComponent!: project_components;
  getProjectComponent!: Sequelize.BelongsToGetAssociationMixin<project_components>;
  setProjectComponent!: Sequelize.BelongsToSetAssociationMixin<project_components, project_componentsId>;
  createProjectComponent!: Sequelize.BelongsToCreateAssociationMixin<project_components>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_bid_components {
    return sequelize.define('project_bid_components', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectBidId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project_bids',
        key: 'id'
      }
    },
    projectComponentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project_components',
        key: 'id'
      }
    },
    quantityPrices: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    tableName: 'project_bid_components',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "project_bid_components_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof project_bid_components;
  }
}