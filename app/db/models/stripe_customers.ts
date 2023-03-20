import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { companies } from "./companies";
import { company_plans, company_plansId } from "./company_plans";

export interface stripe_customersAttributes {
  id: string;
  companyId: string;
  customerId: string;
  subscriptionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type stripe_customersPk = "id";
export type stripe_customersId = stripe_customers[stripe_customersPk];
export type stripe_customersOptionalAttributes = "createdAt" | "updatedAt";
export type stripe_customersCreationAttributes = Optional<
  stripe_customersAttributes,
  stripe_customersOptionalAttributes
>;

export class stripe_customers
  extends Model<stripe_customersAttributes, stripe_customersCreationAttributes>
  implements stripe_customersAttributes
{
  id!: string;
  companyId!: string;
  customerId!: string;
  subscriptionId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  company_plan!: company_plans;
  getCompany_plan!: Sequelize.HasOneGetAssociationMixin<company_plans>;
  setCompany_plan!: Sequelize.HasOneSetAssociationMixin<
    company_plans,
    company_plansId
  >;

  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof stripe_customers {
    return sequelize.define(
      "stripe_customers",
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
          unique: "stripe_customer_companyId_key",
          onDelete: "CASCADE",
        },
        customerId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscriptionId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "stripe_customers",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "stripe_customers_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "stripe_customer_companyId_key",
            unique: true,
            fields: [{ name: "companyId" }],
          },
        ],
      }
    ) as typeof stripe_customers;
  }
}
