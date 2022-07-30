import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';

export interface vendorsAttributes {
  id: string;
  companyId: string;
  moq: string;
  leadTime: number;
  materials: string[];
  locations: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type vendorsPk = "id";
export type vendorsId = vendors[vendorsPk];
export type vendorsOptionalAttributes = "createdAt" | "updatedAt";
export type vendorsCreationAttributes = Optional<vendorsAttributes, vendorsOptionalAttributes>;

export class vendors extends Model<vendorsAttributes, vendorsCreationAttributes> implements vendorsAttributes {
  id!: string;
  companyId!: string;
  moq!: string;
  leadTime!: number;
  materials!: string[];
  locations!: string[];
  createdAt!: Date;
  updatedAt!: Date;

  // vendors belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof vendors {
    return sequelize.define('vendors', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: "vendors_companyId_id_key"
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      },
      unique: "vendors_companyId_id_key"
    },
    moq: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leadTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    materials: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    locations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    tableName: 'vendors',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "vendors_companyId_id_key",
        unique: true,
        fields: [
          { name: "companyId" },
          { name: "id" },
        ]
      },
      {
        name: "vendors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof vendors;
  }
}
