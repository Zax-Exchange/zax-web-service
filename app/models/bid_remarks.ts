import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { projects, projectsId } from "./projects";
import type { project_bids } from "./project_bids";

export interface bid_remarksAttributes {
  id: string;
  projectId?: string;
  projectBidId?: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type bid_remarksPk = "id";
export type bid_remarksId = bid_remarks[bid_remarksPk];
export type bid_remarksOptionalAttributes =
  | "projectId"
  | "projectBidId"
  | "createdAt"
  | "updatedAt";
export type bid_remarksCreationAttributes = Optional<
  bid_remarksAttributes,
  bid_remarksOptionalAttributes
>;

export class bid_remarks
  extends Model<bid_remarksAttributes, bid_remarksCreationAttributes>
  implements bid_remarksAttributes
{
  id!: string;
  projectBidId?: string;
  projectId?: string;
  fileName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // bid_remarks belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  hasProject!: Sequelize.HasOneGetAssociationMixin<projects>;

  // bid_remarks belongsTo project_bids via projectBidId
  project_bid!: project_bids;
  getProject_bid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
  hasProject_bid!: Sequelize.HasOneGetAssociationMixin<project_bids>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bid_remarks {
    return sequelize.define(
      "bid_remarks",
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
      },
      {
        tableName: "bid_remarks",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "bid_remarks_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof bid_remarks;
  }
}
