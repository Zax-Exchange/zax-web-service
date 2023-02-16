import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { InvoiceStatus } from "../../graphql/resolvers-types.generated";
import type { projects, projectsId } from "./projects";
import type { project_bids } from "./project_bids";

export interface invoicesAttributes {
  id: string;
  projectId?: string;
  projectBidId?: string;
  fileName: string;
  status: InvoiceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type invoicesPk = "id";
export type invoicesId = invoices[invoicesPk];
export type invoicesOptionalAttributes =
  | "projectId"
  | "projectBidId"
  | "createdAt"
  | "updatedAt";
export type invoicesCreationAttributes = Optional<
  invoicesAttributes,
  invoicesOptionalAttributes
>;

export class invoices
  extends Model<invoicesAttributes, invoicesCreationAttributes>
  implements invoicesAttributes
{
  id!: string;
  projectBidId?: string;
  projectId?: string;
  fileName!: string;
  status!: InvoiceStatus;
  createdAt!: Date;
  updatedAt!: Date;

  // invoices belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  hasProject!: Sequelize.HasOneGetAssociationMixin<projects>;

  // invoices belongsTo project_bids via projectBidId
  project_bid!: project_bids;
  getProject_bid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  hasProject_bid!: Sequelize.HasOneGetAssociationMixin<project_bids>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoices {
    return sequelize.define(
      "invoices",
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
        tableName: "invoices",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "invoices_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof invoices;
  }
}
