import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company_plans, company_plansCreationAttributes, company_plansId } from './company_plans';
import type { customers, customersId } from './customers';
import type { project_bids, project_bidsId } from './project_bids';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';
import type { vendors, vendorsId } from './vendors';

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
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type companiesPk = "id";
export type companiesId = companies[companiesPk];
export type companiesOptionalAttributes = "logo" | "fax" | "companyUrl" | "createdAt" | "updatedAt";
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
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;

  // companies hasOne company_plans via companyId
  company_plan!: company_plans;
  getCompany_plan!: Sequelize.HasOneGetAssociationMixin<company_plans>;
  setCompany_plan!: Sequelize.HasOneSetAssociationMixin<company_plans, company_plansId>;
  createCompany_plan!: Sequelize.HasOneCreateAssociationMixin<company_plans>;
  // companies hasMany customers via companyId
  customers!: customers[];
  getCustomers!: Sequelize.HasManyGetAssociationsMixin<customers>;
  setCustomers!: Sequelize.HasManySetAssociationsMixin<customers, customersId>;
  addCustomer!: Sequelize.HasManyAddAssociationMixin<customers, customersId>;
  addCustomers!: Sequelize.HasManyAddAssociationsMixin<customers, customersId>;
  createCustomer!: Sequelize.HasManyCreateAssociationMixin<customers>;
  removeCustomer!: Sequelize.HasManyRemoveAssociationMixin<customers, customersId>;
  removeCustomers!: Sequelize.HasManyRemoveAssociationsMixin<customers, customersId>;
  hasCustomer!: Sequelize.HasManyHasAssociationMixin<customers, customersId>;
  hasCustomers!: Sequelize.HasManyHasAssociationsMixin<customers, customersId>;
  countCustomers!: Sequelize.HasManyCountAssociationsMixin;
  // companies hasMany project_bids via companyId
  project_bids!: project_bids[];
  getProject_bids!: Sequelize.HasManyGetAssociationsMixin<project_bids>;
  setProject_bids!: Sequelize.HasManySetAssociationsMixin<project_bids, project_bidsId>;
  addProject_bid!: Sequelize.HasManyAddAssociationMixin<project_bids, project_bidsId>;
  addProject_bids!: Sequelize.HasManyAddAssociationsMixin<project_bids, project_bidsId>;
  createProject_bid!: Sequelize.HasManyCreateAssociationMixin<project_bids>;
  removeProject_bid!: Sequelize.HasManyRemoveAssociationMixin<project_bids, project_bidsId>;
  removeProject_bids!: Sequelize.HasManyRemoveAssociationsMixin<project_bids, project_bidsId>;
  hasProject_bid!: Sequelize.HasManyHasAssociationMixin<project_bids, project_bidsId>;
  hasProject_bids!: Sequelize.HasManyHasAssociationsMixin<project_bids, project_bidsId>;
  countProject_bids!: Sequelize.HasManyCountAssociationsMixin;
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
  // companies hasMany vendors via companyId
  vendors!: vendors[];
  getVendors!: Sequelize.HasManyGetAssociationsMixin<vendors>;
  setVendors!: Sequelize.HasManySetAssociationsMixin<vendors, vendorsId>;
  addVendor!: Sequelize.HasManyAddAssociationMixin<vendors, vendorsId>;
  addVendors!: Sequelize.HasManyAddAssociationsMixin<vendors, vendorsId>;
  createVendor!: Sequelize.HasManyCreateAssociationMixin<vendors>;
  removeVendor!: Sequelize.HasManyRemoveAssociationMixin<vendors, vendorsId>;
  removeVendors!: Sequelize.HasManyRemoveAssociationsMixin<vendors, vendorsId>;
  hasVendor!: Sequelize.HasManyHasAssociationMixin<vendors, vendorsId>;
  hasVendors!: Sequelize.HasManyHasAssociationsMixin<vendors, vendorsId>;
  countVendors!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof companies {
    return sequelize.define('companies', {
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
      allowNull: false
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
    }
  }, {
    tableName: 'companies',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
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
