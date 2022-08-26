import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';

export interface customersAttributes {
  id: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type customersPk = "id";
export type customersId = customers[customersPk];
export type customersOptionalAttributes = "createdAt" | "updatedAt";
export type customersCreationAttributes = Optional<customersAttributes, customersOptionalAttributes>;

export class customers extends Model<customersAttributes, customersCreationAttributes> implements customersAttributes {
  id!: string;
  companyId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // customers belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof customers {
    return sequelize.define('customers', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: "customers_id_companyId_key"
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      },
      unique: "customers_id_companyId_key"
    }
  }, {
    tableName: 'customers',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customers_id_companyId_key",
        unique: true,
        fields: [
          { name: "id" },
          { name: "companyId" },
        ]
      },
      {
        name: "customers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof customers;
  }
}
