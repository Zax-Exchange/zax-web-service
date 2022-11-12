import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { companies } from "./companies";

export interface pending_join_requestsAttributes {
  id: string;
  companyId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type pending_join_requestsPk = "id";
export type pending_join_requestsId =
  pending_join_requests[pending_join_requestsPk];
export type pending_join_requestsOptionalAttributes = "createdAt" | "updatedAt";
export type pending_join_requestsCreationAttributes = Optional<
  pending_join_requestsAttributes,
  pending_join_requestsOptionalAttributes
>;

export class pending_join_requests
  extends Model<
    pending_join_requestsAttributes,
    pending_join_requestsCreationAttributes
  >
  implements pending_join_requestsAttributes
{
  id!: string;
  companyId!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // customers belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof pending_join_requests {
    return sequelize.define(
      "pending_join_requests",
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
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "pending_join_requests",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "pending_join_requests_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "pending_join_requests_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
        ],
      }
    ) as typeof pending_join_requests;
  }
}
