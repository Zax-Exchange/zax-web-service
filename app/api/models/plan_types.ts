import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';

export interface plan_typesAttributes {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export type plan_typesPk = "id";
export type plan_typesId = plan_types[plan_typesPk];
export type plan_typesOptionalAttributes = "createdAt" | "updatedAt";
export type plan_typesCreationAttributes = Optional<plan_typesAttributes, plan_typesOptionalAttributes>;

export class plan_types extends Model<plan_typesAttributes, plan_typesCreationAttributes> implements plan_typesAttributes {
  id!: number;
  name!: string;
  price!: number;
  createdAt!: Date;
  updatedAt!: Date;

  // plan_types hasMany companies via planId
  companies!: companies[];
  getCompanies!: Sequelize.HasManyGetAssociationsMixin<companies>;
  setCompanies!: Sequelize.HasManySetAssociationsMixin<companies, companiesId>;
  addCompany!: Sequelize.HasManyAddAssociationMixin<companies, companiesId>;
  addCompanies!: Sequelize.HasManyAddAssociationsMixin<companies, companiesId>;
  createCompany!: Sequelize.HasManyCreateAssociationMixin<companies>;
  removeCompany!: Sequelize.HasManyRemoveAssociationMixin<companies, companiesId>;
  removeCompanies!: Sequelize.HasManyRemoveAssociationsMixin<companies, companiesId>;
  hasCompany!: Sequelize.HasManyHasAssociationMixin<companies, companiesId>;
  hasCompanies!: Sequelize.HasManyHasAssociationsMixin<companies, companiesId>;
  countCompanies!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof plan_types {
    return sequelize.define('plan_types', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'plan_types',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "plan_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof plan_types;
  }
}
