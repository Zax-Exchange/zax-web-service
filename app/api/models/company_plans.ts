import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';
import type { plans, plansId } from './plans';
import type { stripe_customers, stripe_customersId } from './stripe_customers';

export interface company_plansAttributes {
  id: string;
  planId: string;
  companyId: string;
  stripeCustomerId?: string;
  remainingQuota: number;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type company_plansPk = "id";
export type company_plansId = company_plans[company_plansPk];
export type company_plansOptionalAttributes = "createdAt" | "updatedAt";
export type company_plansCreationAttributes = Optional<company_plansAttributes, company_plansOptionalAttributes>;

export class company_plans extends Model<company_plansAttributes, company_plansCreationAttributes> implements company_plansAttributes {
  id!: string;
  planId!: string;
  companyId!: string;
  stripeCustomerId?: string;
  remainingQuota!: number;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  // company_plans belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // company_plans belongsTo plans via planId
  plan!: plans;
  getPlan!: Sequelize.BelongsToGetAssociationMixin<plans>;
  setPlan!: Sequelize.BelongsToSetAssociationMixin<plans, plansId>;
  createPlan!: Sequelize.BelongsToCreateAssociationMixin<plans>;
  // company_plans hasOne stripe_customers via stripeCustomerId
  stripe_customer!: stripe_customers;
  getStripe_customer!: Sequelize.HasOneGetAssociationMixin<stripe_customers>;
  setStripe_cusomter!: Sequelize.HasOneSetAssociationMixin<stripe_customers, stripe_customersId>;
  createStripe_customer!: Sequelize.HasOneCreateAssociationMixin<stripe_customers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof company_plans {
    return sequelize.define('company_plans', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'plans',
        key: 'id'
      }
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      },
      unique: "company_plans_companyId_key"
    },
    stripeCustomerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'stripe_customers',
        key: 'id'
      },
      unique: "company_plans_stripe_customerId_key"
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remainingQuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'company_plans',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "company_plans_companyId_key",
        unique: true,
        fields: [
          { name: "companyId" },
        ]
      },
      {
        name: "company_plans_stripe_customerId_key",
        unique: true,
        fields: [
          { name: "stripeCustomerId" }
        ]
      },
      {
        name: "company_plans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof company_plans;
  }
}
