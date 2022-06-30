import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';
import type { product_types, product_typesId } from './product_types';

export interface company_product_typesAttributes {
  id: number;
  productTypeId?: number;
  companyId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type company_product_typesPk = "id";
export type company_product_typesId = company_product_types[company_product_typesPk];
export type company_product_typesOptionalAttributes = "productTypeId" | "companyId" | "createdAt" | "updatedAt";
export type company_product_typesCreationAttributes = Optional<company_product_typesAttributes, company_product_typesOptionalAttributes>;

export class company_product_types extends Model<company_product_typesAttributes, company_product_typesCreationAttributes> implements company_product_typesAttributes {
  id!: number;
  productTypeId?: number;
  companyId?: number;
  createdAt!: Date;
  updatedAt!: Date;

  // company_product_types belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // company_product_types belongsTo product_types via productTypeId
  productType!: product_types;
  getProductType!: Sequelize.BelongsToGetAssociationMixin<product_types>;
  setProductType!: Sequelize.BelongsToSetAssociationMixin<product_types, product_typesId>;
  createProductType!: Sequelize.BelongsToCreateAssociationMixin<product_types>;

  static initModel(sequelize: Sequelize.Sequelize): typeof company_product_types {
    return sequelize.define('company_product_types', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_types',
        key: 'id'
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
  }, {
    tableName: 'company_product_types',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "company_product_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof company_product_types;
  }
}
