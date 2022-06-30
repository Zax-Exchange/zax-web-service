import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { users, usersId } from './users';

export interface project_permissionsAttributes {
  id: number;
  userId?: number;
  projectId?: number;
  createdAt: Date;
  updatedAt: Date;
  permission: string;
}

export type project_permissionsPk = "id";
export type project_permissionsId = project_permissions[project_permissionsPk];
export type project_permissionsOptionalAttributes = "userId" | "projectId" | "createdAt" | "updatedAt";
export type project_permissionsCreationAttributes = Optional<project_permissionsAttributes, project_permissionsOptionalAttributes>;

export class project_permissions extends Model<project_permissionsAttributes, project_permissionsCreationAttributes> implements project_permissionsAttributes {
  id!: number;
  userId?: number;
  projectId?: number;
  createdAt!: Date;
  updatedAt!: Date;
  permission!: string;

  // project_permissions belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // project_permissions belongsTo users via userId
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_permissions {
    return sequelize.define('project_permissions', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "project_viewers_userId_projectId_key"
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      },
      unique: "project_viewers_userId_projectId_key"
    },
    permission: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'project_permissions',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "project_viewers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "project_viewers_userId_projectId_key",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "projectId" },
        ]
      },
    ]
  }) as typeof project_permissions;
  }
}
