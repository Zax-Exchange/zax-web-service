import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';
import type { plans, plansId } from './plans';

export interface company_plansAttributes {
  id: string;
  planId: string;
  companyId: string;
  remainingQuota: number;
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
  remainingQuota!: number;
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
    remainingQuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'company_plans',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "company_plans_companyId_key",
        unique: true,
        fields: [
          { name: "companyId" },
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
