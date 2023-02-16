import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type {
  project_bid_components,
  project_bid_componentsId,
} from "./project_bid_components";
import { project_components, project_componentsId } from "./project_components";

export interface component_specsAttributes {
  id: string;
  projectComponentId: string;
  productName: string;
  dimension: string;
  boxStyle?: string;
  style?: string;
  includeArtworkInQuote?: boolean;

  /* unique attr for booklet */
  numberOfPages?: string;

  /* unique attr for sticker */
  purpose?: string;
  shape?: string;

  /* unique attribute for molded fiber */
  manufacturingProcess?: string;

  /* unique attribute for corrugate */
  flute?: string;

  /* common attributes for products that do not have inside/outside difference */
  thickness?: string;
  color?: string;
  material?: string;
  materialSource?: string;
  postProcess?: string;
  finish?: string;

  /* common attributes for products that have inside/outside difference */
  outsideColor?: string;
  outsideMaterial?: string;
  outsideMaterialSource?: string;
  outsideFinish?: string;

  insideColor?: string;
  insideMaterial?: string;
  insideMaterialSource?: string;
  insideFinish?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type component_specsPk = "id";
export type component_specsId = component_specs[component_specsPk];
export type component_specsOptionalAttributes =
  | "includeArtworkInQuote"
  | "style"
  | "boxStyle"
  | "numberOfPages"
  | "purpose"
  | "shape"
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
  | "outsideFinish"
  | "insideColor"
  | "insideMaterial"
  | "insideMaterialSource"
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
  includeArtworkInQuote?: boolean;
  style?: string;
  numberOfPages?: string;
  boxStyle?: string;
  purpose?: string;
  shape?: string;
  thickness?: string;
  flute?: string;
  manufacturingProcess?: string;

  color?: string;
  material?: string;
  materialSource?: string;
  postProcess?: string;
  finish?: string;

  outsideColor?: string;
  outsideMaterial?: string;
  outsideMaterialSource?: string;
  outsideFinish?: string;

  insideColor?: string;
  insideMaterial?: string;
  insideMaterialSource?: string;
  insideFinish?: string;

  createdAt!: Date;
  updatedAt!: Date;

  // component_specs belongsTo project_bid_components via projectComponentId
  project_component!: project_components;
  getProject_component!: Sequelize.BelongsToGetAssociationMixin<project_components>;
  setProject_component!: Sequelize.BelongsToSetAssociationMixin<
    project_components,
    project_componentsId
  >;
  createProjectComponent!: Sequelize.BelongsToCreateAssociationMixin<project_components>;

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
          type: DataTypes.JSON,
          allowNull: false,
        },
        includeArtworkInQuote: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        numberOfPages: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        style: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        boxStyle: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        purpose: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        shape: {
          type: DataTypes.STRING(255),
          allowNull: true,
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
          type: DataTypes.JSON,
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

        insideFinish: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: "component_specs",
        schema: "public",
        timestamps: true,
        paranoid: true,
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
