import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type {
  project_bid_components,
  project_bid_componentsId,
} from "./project_bid_components";
import type { projects, projectsId } from "./projects";
import { component_specs, component_specsId } from "./component_specs";
import { project_designs } from "./project_designs";

export interface project_componentsAttributes {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type project_componentsPk = "id";
export type project_componentsId = project_components[project_componentsPk];
export type project_componentsOptionalAttributes = "createdAt" | "updatedAt";
export type project_componentsCreationAttributes = Optional<
  project_componentsAttributes,
  project_componentsOptionalAttributes
>;

export class project_components
  extends Model<
    project_componentsAttributes,
    project_componentsCreationAttributes
  >
  implements project_componentsAttributes
{
  id!: string;
  projectId!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // project_components hasMany project_bid_components via projectComponentId
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
  // project_components belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;

  component_specs!: component_specs[];
  getComponent_spec!: Sequelize.HasOneGetAssociationMixin<component_specs>;
  setComponent_spec!: Sequelize.HasOneSetAssociationMixin<
    component_specs,
    component_specsId
  >;

  // project_components hasMany project_designs via projectId
  project_design!: project_designs[];
  getProject_design!: Sequelize.HasManyGetAssociationsMixin<project_designs>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_components {
    return sequelize.define(
      "project_components",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "project_components",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "project_components_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof project_components;
  }
}
