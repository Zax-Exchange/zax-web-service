import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { BidIntentStatus } from "../graphql/resolvers-types.generated";
import type { companies, companiesId } from "./companies";
import { projects } from "./projects";

export interface bid_intentsAttributes {
  id: string;
  projectId: string;
  userId: string;
  companyId: string;
  status: BidIntentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type bid_intentsPk = "id";
export type bid_intentsId = bid_intents[bid_intentsPk];
export type bid_intentsOptionalAttributes = "createdAt" | "updatedAt";
export type bid_intentsCreationAttributes = Optional<
  bid_intentsAttributes,
  bid_intentsOptionalAttributes
>;

export class bid_intents
  extends Model<bid_intentsAttributes, bid_intentsCreationAttributes>
  implements bid_intentsAttributes
{
  id!: string;
  companyId!: string;
  projectId!: string;
  userId!: string;
  status!: BidIntentStatus;
  createdAt!: Date;
  updatedAt!: Date;

  // bid_intents belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;

  // bid_intents belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bid_intents {
    return sequelize.define(
      "bid_intents",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "companies",
            key: "id",
          },
          unique: "bid_intents_id_companyId_key",
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
            key: "id",
          },
          unique: "bid_intents_id_projectId_key",
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          unique: "bid_intents_id_userId_key",
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "bid_intents",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "bid_intents_id_companyId_key",
            unique: true,
            fields: [{ name: "id" }, { name: "companyId" }],
          },
          {
            name: "bid_intents_id_projectId_key",
            unique: true,
            fields: [{ name: "id" }, { name: "projectId" }],
          },
          {
            name: "bid_intents_id_userId_key",
            unique: true,
            fields: [{ name: "id" }, { name: "userId" }],
          },
          {
            name: "bid_intents_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof bid_intents;
  }
}
