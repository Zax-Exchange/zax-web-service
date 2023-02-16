import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { PurchaseOrderStatus } from "../../graphql/resolvers-types.generated";
import type { projects, projectsId } from "./projects";
import type { project_bids } from "./project_bids";

export interface purchase_ordersAttributes {
  id: string;
  projectId?: string;
  projectBidId?: string;
  fileName: string;
  status: PurchaseOrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type purchase_ordersPk = "id";
export type purchase_ordersId = purchase_orders[purchase_ordersPk];
export type purchase_ordersOptionalAttributes =
  | "projectId"
  | "projectBidId"
  | "createdAt"
  | "updatedAt";
export type purchase_ordersCreationAttributes = Optional<
  purchase_ordersAttributes,
  purchase_ordersOptionalAttributes
>;

export class purchase_orders
  extends Model<purchase_ordersAttributes, purchase_ordersCreationAttributes>
  implements purchase_ordersAttributes
{
  id!: string;
  projectBidId?: string;
  projectId?: string;
  fileName!: string;
  status!: PurchaseOrderStatus;
  createdAt!: Date;
  updatedAt!: Date;

  // purchase_orders belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  hasProject!: Sequelize.HasOneGetAssociationMixin<projects>;

  // purchase_orders belongsTo project_bids via projectBidId
  project_bid!: project_bids;
  getProject_bid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  hasProject_bid!: Sequelize.HasOneGetAssociationMixin<project_bids>;

  static initModel(sequelize: Sequelize.Sequelize): typeof purchase_orders {
    return sequelize.define(
      "purchase_orders",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        projectBidId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "project_bids",
            key: "id",
          },
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "projects",
            key: "id",
          },
          onDelete: "cascade",
        },
        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "purchase_orders",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "purchase_orders_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof purchase_orders;
  }
}
