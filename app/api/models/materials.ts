import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company_materials, company_materialsId } from './company_materials';

export interface materialsAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type materialsPk = "id";
export type materialsId = materials[materialsPk];
export type materialsOptionalAttributes = "createdAt" | "updatedAt";
export type materialsCreationAttributes = Optional<materialsAttributes, materialsOptionalAttributes>;

export class materials extends Model<materialsAttributes, materialsCreationAttributes> implements materialsAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // materials hasMany company_materials via materialId
  company_materials!: company_materials[];
  getCompany_materials!: Sequelize.HasManyGetAssociationsMixin<company_materials>;
  setCompany_materials!: Sequelize.HasManySetAssociationsMixin<company_materials, company_materialsId>;
  addCompany_material!: Sequelize.HasManyAddAssociationMixin<company_materials, company_materialsId>;
  addCompany_materials!: Sequelize.HasManyAddAssociationsMixin<company_materials, company_materialsId>;
  createCompany_material!: Sequelize.HasManyCreateAssociationMixin<company_materials>;
  removeCompany_material!: Sequelize.HasManyRemoveAssociationMixin<company_materials, company_materialsId>;
  removeCompany_materials!: Sequelize.HasManyRemoveAssociationsMixin<company_materials, company_materialsId>;
  hasCompany_material!: Sequelize.HasManyHasAssociationMixin<company_materials, company_materialsId>;
  hasCompany_materials!: Sequelize.HasManyHasAssociationsMixin<company_materials, company_materialsId>;
  countCompany_materials!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof materials {
    return sequelize.define('materials', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "materials_name_key"
    }
  }, {
    tableName: 'materials',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "materials_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "materials_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof materials;
  }
}
