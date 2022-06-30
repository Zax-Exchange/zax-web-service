import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project_component_bids, project_component_bidsId } from './project_component_bids';
import type { projects, projectsId } from './projects';

export interface project_componentsAttributes {
  id: number;
  projectId: number;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
  createdAt: Date;
  updatedAt: Date;
}

export type project_componentsPk = "id";
export type project_componentsId = project_components[project_componentsPk];
export type project_componentsOptionalAttributes = "createdAt" | "updatedAt";
export type project_componentsCreationAttributes = Optional<project_componentsAttributes, project_componentsOptionalAttributes>;

export class project_components extends Model<project_componentsAttributes, project_componentsCreationAttributes> implements project_componentsAttributes {
  id!: number;
  projectId!: number;
  name!: string;
  materials!: string[];
  dimension!: string;
  postProcess!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // project_components hasMany project_component_bids via projectComponentId
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
  // project_components belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_components {
    return sequelize.define('project_components', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    materials: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    dimension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postProcess: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'project_components',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "project_components_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof project_components;
  }
}
