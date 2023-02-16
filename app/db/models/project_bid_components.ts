import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { QuantityPrice } from "../../graphql/resolvers-types.generated";
import type { project_bids, project_bidsId } from "./project_bids";
import type {
  project_components,
  project_componentsId,
} from "./project_components";

export interface project_bid_componentsAttributes {
  id: string;
  projectBidId: string;
  projectComponentId: string;
  quantityPrices: QuantityPrice[];
  samplingFee: string;
  toolingFee: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type project_bid_componentsPk = "id";
export type project_bid_componentsId =
  project_bid_components[project_bid_componentsPk];
export type project_bid_componentsOptionalAttributes =
  | "createdAt"
  | "updatedAt";
export type project_bid_componentsCreationAttributes = Optional<
  project_bid_componentsAttributes,
  project_bid_componentsOptionalAttributes
>;

export class project_bid_components
  extends Model<
    project_bid_componentsAttributes,
    project_bid_componentsCreationAttributes
  >
  implements project_bid_componentsAttributes
{
  id!: string;
  projectBidId!: string;
  projectComponentId!: string;
  quantityPrices!: QuantityPrice[];
  samplingFee!: string;
  toolingFee!: string | null;
  createdAt!: Date;
  updatedAt!: Date;

  // project_bid_components belongsTo project_bids via projectBidId
  project_bid!: project_bids;
  getProject_bid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  setProject_bid!: Sequelize.BelongsToSetAssociationMixin<
    project_bids,
    project_bidsId
  >;
  createProject_bid!: Sequelize.BelongsToCreateAssociationMixin<project_bids>;
  // project_bid_components belongsTo project_components via projectComponentId
  project_component!: project_components;
  getProject_component!: Sequelize.BelongsToGetAssociationMixin<project_components>;
  setProject_component!: Sequelize.BelongsToSetAssociationMixin<
    project_components,
    project_componentsId
  >;
  createProject_component!: Sequelize.BelongsToCreateAssociationMixin<project_components>;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof project_bid_components {
    return sequelize.define(
      "project_bid_components",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        projectBidId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "project_bids",
            key: "id",
          },
          onDelete: "cascade",
        },
        projectComponentId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "project_components",
            key: "id",
          },
          onDelete: "cascade",
        },
        quantityPrices: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        samplingFee: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        toolingFee: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "project_bid_components",
        schema: "public",
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: "project_bid_components_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof project_bid_components;
  }
}
