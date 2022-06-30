import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project_bids, project_bidsId } from './project_bids';
import type { project_components, project_componentsId } from './project_components';

export interface project_component_bidsAttributes {
  id: number;
  projectBidId: number;
  projectComponentId: number;
  createdAt: Date;
  updatedAt: Date;
  quantityPrices: object;
}

export type project_component_bidsPk = "id";
export type project_component_bidsId = project_component_bids[project_component_bidsPk];
export type project_component_bidsOptionalAttributes = "createdAt" | "updatedAt";
export type project_component_bidsCreationAttributes = Optional<project_component_bidsAttributes, project_component_bidsOptionalAttributes>;

export class project_component_bids extends Model<project_component_bidsAttributes, project_component_bidsCreationAttributes> implements project_component_bidsAttributes {
  id!: number;
  projectBidId!: number;
  projectComponentId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  quantityPrices!: object;

  // project_component_bids belongsTo project_bids via projectBidId
  projectBid!: project_bids;
  getProjectBid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  setProjectBid!: Sequelize.BelongsToSetAssociationMixin<project_bids, project_bidsId>;
  createProjectBid!: Sequelize.BelongsToCreateAssociationMixin<project_bids>;
  // project_component_bids belongsTo project_components via projectComponentId
  projectComponent!: project_components;
  getProjectComponent!: Sequelize.BelongsToGetAssociationMixin<project_components>;
  setProjectComponent!: Sequelize.BelongsToSetAssociationMixin<project_components, project_componentsId>;
  createProjectComponent!: Sequelize.BelongsToCreateAssociationMixin<project_components>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_component_bids {
    return sequelize.define('project_component_bids', {
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
    tableName: 'project_component_bids',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "project_component_bids_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof project_component_bids;
  }
}
