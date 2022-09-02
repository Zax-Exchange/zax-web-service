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
  dimension: string;

  /* unique attribute for molded fiber */
  manufacturingProcess?: string;

  /* unique attribute for corrugate */
  flute?: string;

  /* common attributes for products that do not have inside/outside difference */
  thickness?: string;
  color?: string;
  material?: string;
  materialSource?: string;
  postProcess?: string[];
  finish?: string;

  /* common attributes for products that have inside/outside difference */
  outsideColor?: string;
  outsideMaterial?: string;
  outsideMaterialSource?: string;
  outsidePostProcess?: string[];
  outsideFinish?: string;

  insideColor?: string;
  insideMaterial?: string;
  insideMaterialSource?: string;
  insidePostProcess?: string[];
  insideFinish?: string;

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
  | "material"
  | "materialSource"
  | "postProcess"
  | "finish"
  | "outsideColor"
  | "outsideMaterial"
  | "outsideMaterialSource"
  | "outsidePostProcess"
  | "outsideFinish"
  | "insideColor"
  | "insideMaterial"
  | "insideMaterialSource"
  | "insidePostProcess"
  | "insideFinish"
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
  dimension!: string;

  thickness?: string;
  flute?: string;
  manufacturingProcess?: string;

  color?: string;
  material?: string;
  materialSource?: string;
  postProcess?: string[];
  finish?: string;

  outsideColor?: string;
  outsideMaterial?: string;
  outsideMaterialSource?: string;
  outsidePostProcess?: string[];
  outsideFinish?: string;

  insideColor?: string;
  insideMaterial?: string;
  insideMaterialSource?: string;
  insidePostProcess?: string[];
  insideFinish?: string;

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
        dimension: {
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
        material: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        materialSource: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        postProcess: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        finish: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        outsideColor: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        outsideMaterial: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        outsideMaterialSource: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        outsidePostProcess: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        outsideFinish: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insideColor: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insideMaterial: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insideMaterialSource: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        insidePostProcess: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        insideFinish: {
          type: DataTypes.STRING(255),
          allowNull: true,
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
