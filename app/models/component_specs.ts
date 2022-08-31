import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type {
  project_bid_components,
  project_bid_componentsId,
} from "./project_bid_components";

export interface component_specsAttributes {
  id: string;
  projectComponentId: string;
  productName: string;
  thickness?: string;
  flute?: string;
  manufacturingProcess?: string;
  color?: string;
  dimension: string;
  createdAt: Date;
  updatedAt: Date;
}

export type component_specsPk = "id";
export type component_specsId = component_specs[component_specsPk];
export type component_specsOptionalAttributes =
  | "thickness"
  | "flute"
  | "manufacturingProcess"
  | "color"
  | "createdAt"
  | "updatedAt";
export type component_specsCreationAttributes = Optional<
  component_specsAttributes,
  component_specsOptionalAttributes
>;

export class component_specs
  extends Model<component_specsAttributes, component_specsCreationAttributes>
  implements component_specsAttributes
{
  id!: string;
  projectComponentId!: string;
  productName!: string;
  thickness?: string;
  flute?: string;
  manufacturingProcess?: string;
  color?: string;
  dimension!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // component_specs belongsTo project_bid_components via projectComponentId
  projectComponent!: project_bid_components;
  getProjectComponent!: Sequelize.BelongsToGetAssociationMixin<project_bid_components>;
  setProjectComponent!: Sequelize.BelongsToSetAssociationMixin<
    project_bid_components,
    project_bid_componentsId
  >;
  createProjectComponent!: Sequelize.BelongsToCreateAssociationMixin<project_bid_components>;

  static initModel(sequelize: Sequelize.Sequelize): typeof component_specs {
    return sequelize.define(
      "component_specs",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        projectComponentId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "project_components",
            key: "id",
          },
        },
        productName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        thickness: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        flute: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        manufacturingProcess: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        color: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        dimension: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: "component_specs",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "component_specs_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof component_specs;
  }
}
