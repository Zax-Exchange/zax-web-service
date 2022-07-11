import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { company_plans, company_plansCreationAttributes, company_plansId } from './company_plans';
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
  locations?: string[];
  moq?: number;
  materials?: string[];
}

export type companiesPk = "id";
export type companiesId = companies[companiesPk];
export type companiesOptionalAttributes = "logo" | "fax" | "companyUrl" | "leadTime" | "createdAt" | "updatedAt" | "locations" | "moq" | "materials";
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
  locations?: string[];
  moq?: number;
  materials?: string[];

  // companies hasOne company_plans via companyId
  company_plan!: company_plans;
  getCompany_plan!: Sequelize.HasOneGetAssociationMixin<company_plans>;
  setCompany_plan!: Sequelize.HasOneSetAssociationMixin<company_plans, company_plansId>;
  createCompany_plan!: Sequelize.HasOneCreateAssociationMixin<company_plans>;
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
    },
    locations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    moq: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    materials: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
