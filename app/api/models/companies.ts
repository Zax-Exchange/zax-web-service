import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company_plans, company_plansId } from './company_plans';
import type { company_product_types, company_product_typesId } from './company_product_types';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface companiesAttributes {
  name: string;
  logo?: any;
  phone: string;
  fax?: string;
  creditCardNumber: string;
  creditCardExp: string;
  creditCardCvv: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  companyUrl?: string;
  leadTime?: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type companiesPk = "id";
export type companiesId = companies[companiesPk];
export type companiesOptionalAttributes = "logo" | "fax" | "companyUrl" | "leadTime" | "createdAt" | "updatedAt";
export type companiesCreationAttributes = Optional<companiesAttributes, companiesOptionalAttributes>;

export class companies extends Model<companiesAttributes, companiesCreationAttributes> implements companiesAttributes {
  name!: string;
  logo?: any;
  phone!: string;
  fax?: string;
  creditCardNumber!: string;
  creditCardExp!: string;
  creditCardCvv!: string;
  country!: string;
  isActive!: boolean;
  isVendor!: boolean;
  isVerified!: boolean;
  companyUrl?: string;
  leadTime?: number;
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;

  // companies hasMany company_plans via companyId
  company_plans!: company_plans[];
  getCompany_plans!: Sequelize.HasManyGetAssociationsMixin<company_plans>;
  setCompany_plans!: Sequelize.HasManySetAssociationsMixin<company_plans, company_plansId>;
  addCompany_plan!: Sequelize.HasManyAddAssociationMixin<company_plans, company_plansId>;
  addCompany_plans!: Sequelize.HasManyAddAssociationsMixin<company_plans, company_plansId>;
  createCompany_plan!: Sequelize.HasManyCreateAssociationMixin<company_plans>;
  removeCompany_plan!: Sequelize.HasManyRemoveAssociationMixin<company_plans, company_plansId>;
  removeCompany_plans!: Sequelize.HasManyRemoveAssociationsMixin<company_plans, company_plansId>;
  hasCompany_plan!: Sequelize.HasManyHasAssociationMixin<company_plans, company_plansId>;
  hasCompany_plans!: Sequelize.HasManyHasAssociationsMixin<company_plans, company_plansId>;
  countCompany_plans!: Sequelize.HasManyCountAssociationsMixin;
  // companies hasMany company_product_types via companyId
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
  // companies hasMany projects via companyId
  projects!: projects[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<projects>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<projects, projectsId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<projects, projectsId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<projects, projectsId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<projects>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<projects, projectsId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<projects, projectsId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<projects, projectsId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<projects, projectsId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;
  // companies hasMany users via companyId
  users!: users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof companies {
    return sequelize.define('companies', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "companies_name_key"
    },
    logo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fax: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creditCardNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "companies_creditCardNumber_key"
    },
    creditCardExp: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    creditCardCvv: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isVendor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    companyUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    leadTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'companies',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "companies_creditCardNumber_key",
        unique: true,
        fields: [
          { name: "creditCardNumber" },
        ]
      },
      {
        name: "companies_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "companies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof companies;
  }
}
