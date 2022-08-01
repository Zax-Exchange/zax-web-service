import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { companies, companiesId } from './companies';
import type { project_bid_permissions, project_bid_permissionsId } from './project_bid_permissions';
import type { project_bids, project_bidsId } from './project_bids';
import type { project_permissions, project_permissionsId } from './project_permissions';
import type { projects, projectsId } from './projects';

export interface usersAttributes {
  id: string;
  companyId: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  isVendor: boolean;
  isActive: boolean;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "createdAt" | "updatedAt" | "isActive";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: string;
  companyId!: string;
  name!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  isVendor!: boolean;
  isActive!: boolean;

  // users belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // users hasMany project_bid_permissions via userId
  project_bid_permissions!: project_bid_permissions[];
  getProject_bid_permissions!: Sequelize.HasManyGetAssociationsMixin<project_bid_permissions>;
  setProject_bid_permissions!: Sequelize.HasManySetAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  addProject_bid_permission!: Sequelize.HasManyAddAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  addProject_bid_permissions!: Sequelize.HasManyAddAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  createProject_bid_permission!: Sequelize.HasManyCreateAssociationMixin<project_bid_permissions>;
  removeProject_bid_permission!: Sequelize.HasManyRemoveAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  removeProject_bid_permissions!: Sequelize.HasManyRemoveAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  hasProject_bid_permission!: Sequelize.HasManyHasAssociationMixin<project_bid_permissions, project_bid_permissionsId>;
  hasProject_bid_permissions!: Sequelize.HasManyHasAssociationsMixin<project_bid_permissions, project_bid_permissionsId>;
  countProject_bid_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany project_bids via userId
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
  // users hasMany project_permissions via userId
  project_permissions!: project_permissions[];
  getProject_permissions!: Sequelize.HasManyGetAssociationsMixin<project_permissions>;
  setProject_permissions!: Sequelize.HasManySetAssociationsMixin<project_permissions, project_permissionsId>;
  addProject_permission!: Sequelize.HasManyAddAssociationMixin<project_permissions, project_permissionsId>;
  addProject_permissions!: Sequelize.HasManyAddAssociationsMixin<project_permissions, project_permissionsId>;
  createProject_permission!: Sequelize.HasManyCreateAssociationMixin<project_permissions>;
  removeProject_permission!: Sequelize.HasManyRemoveAssociationMixin<project_permissions, project_permissionsId>;
  removeProject_permissions!: Sequelize.HasManyRemoveAssociationsMixin<project_permissions, project_permissionsId>;
  hasProject_permission!: Sequelize.HasManyHasAssociationMixin<project_permissions, project_permissionsId>;
  hasProject_permissions!: Sequelize.HasManyHasAssociationsMixin<project_permissions, project_permissionsId>;
  countProject_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany projects via userId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isVendor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeDestroy: async (instance, options) => {
        instance.getProject_permissions().then(ps => {
          for (let p of ps) p.destroy();
        })
        instance.getProject_bid_permissions().then(ps => {
          for (let p of ps) p.destroy()
        })
      }
    },
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof users;
  }
}
