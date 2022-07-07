import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';
import type { materials, materialsId } from './materials';

export interface company_materialsAttributes {
  id: number;
  companyId: number;
  materialId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type company_materialsPk = "id";
export type company_materialsId = company_materials[company_materialsPk];
export type company_materialsOptionalAttributes = "createdAt" | "updatedAt";
export type company_materialsCreationAttributes = Optional<company_materialsAttributes, company_materialsOptionalAttributes>;

export class company_materials extends Model<company_materialsAttributes, company_materialsCreationAttributes> implements company_materialsAttributes {
  id!: number;
  companyId!: number;
  materialId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  // company_materials belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // company_materials belongsTo materials via materialId
  material!: materials;
  getMaterial!: Sequelize.BelongsToGetAssociationMixin<materials>;
  setMaterial!: Sequelize.BelongsToSetAssociationMixin<materials, materialsId>;
  createMaterial!: Sequelize.BelongsToCreateAssociationMixin<materials>;

  static initModel(sequelize: Sequelize.Sequelize): typeof company_materials {
    return sequelize.define('company_materials', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      },
      unique: "company_materials_companyId_materialId_key"
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materials',
        key: 'id'
      },
      unique: "company_materials_companyId_materialId_key"
    }
  }, {
    tableName: 'company_materials',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "company_materials_companyId_materialId_key",
        unique: true,
        fields: [
          { name: "companyId" },
          { name: "materialId" },
        ]
      },
      {
        name: "company_materials_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof company_materials;
  }
}
