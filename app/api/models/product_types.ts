import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company_product_types, company_product_typesId } from './company_product_types';

export interface product_typesAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type product_typesPk = "id";
export type product_typesId = product_types[product_typesPk];
export type product_typesOptionalAttributes = "createdAt" | "updatedAt";
export type product_typesCreationAttributes = Optional<product_typesAttributes, product_typesOptionalAttributes>;

export class product_types extends Model<product_typesAttributes, product_typesCreationAttributes> implements product_typesAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // product_types hasMany company_product_types via productTypeId
  company_product_types!: company_product_types[];
  getCompany_product_types!: Sequelize.HasManyGetAssociationsMixin<company_product_types>;
  setCompany_product_types!: Sequelize.HasManySetAssociationsMixin<company_product_types, company_product_typesId>;
  addCompany_product_type!: Sequelize.HasManyAddAssociationMixin<company_product_types, company_product_typesId>;
  addCompany_product_types!: Sequelize.HasManyAddAssociationsMixin<company_product_types, company_product_typesId>;
  createCompany_product_type!: Sequelize.HasManyCreateAssociationMixin<company_product_types>;
  removeCompany_product_type!: Sequelize.HasManyRemoveAssociationMixin<company_product_types, company_product_typesId>;
  removeCompany_product_types!: Sequelize.HasManyRemoveAssociationsMixin<company_product_types, company_product_typesId>;
  hasCompany_product_type!: Sequelize.HasManyHasAssociationMixin<company_product_types, company_product_typesId>;
  hasCompany_product_types!: Sequelize.HasManyHasAssociationsMixin<company_product_types, company_product_typesId>;
  countCompany_product_types!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_types {
    return sequelize.define('product_types', {
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
    }
  }, {
    tableName: 'product_types',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "product_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof product_types;
  }
}
