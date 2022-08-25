import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { CompanySize, PlanTier } from "../../graphql/resolvers-types.generated";
import { Pricings } from "../types/common/planTypes";
import type { company_plans, company_plansId } from "./company_plans";

export interface plansAttributes {
  id: string;
  isVendor: boolean;
  companySize?: CompanySize;
  tier: PlanTier;
  pricings: Pricings;
  createdAt: Date;
  updatedAt: Date;
}

export type plansPk = "id";
export type plansId = plans[plansPk];
export type plansOptionalAttributes = "createdAt" | "updatedAt";
export type plansCreationAttributes = Optional<
  plansAttributes,
  plansOptionalAttributes
>;

export class plans
  extends Model<plansAttributes, plansCreationAttributes>
  implements plansAttributes
{
  id!: string;
  isVendor!: boolean;
  companySize?: CompanySize;
  tier!: PlanTier;
  pricings!: Pricings;
  createdAt!: Date;
  updatedAt!: Date;

  // plans hasMany company_plans via planId
  company_plans!: company_plans[];
  getCompany_plans!: Sequelize.HasManyGetAssociationsMixin<company_plans>;
  setCompany_plans!: Sequelize.HasManySetAssociationsMixin<
    company_plans,
    company_plansId
  >;
  addCompany_plan!: Sequelize.HasManyAddAssociationMixin<
    company_plans,
    company_plansId
  >;
  addCompany_plans!: Sequelize.HasManyAddAssociationsMixin<
    company_plans,
    company_plansId
  >;
  createCompany_plan!: Sequelize.HasManyCreateAssociationMixin<company_plans>;
  removeCompany_plan!: Sequelize.HasManyRemoveAssociationMixin<
    company_plans,
    company_plansId
  >;
  removeCompany_plans!: Sequelize.HasManyRemoveAssociationsMixin<
    company_plans,
    company_plansId
  >;
  hasCompany_plan!: Sequelize.HasManyHasAssociationMixin<
    company_plans,
    company_plansId
  >;
  hasCompany_plans!: Sequelize.HasManyHasAssociationsMixin<
    company_plans,
    company_plansId
  >;
  countCompany_plans!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof plans {
    return sequelize.define(
      "plans",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        isVendor: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        companySize: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tier: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pricings: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        tableName: "plans",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "plan_types_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof plans;
  }
}
