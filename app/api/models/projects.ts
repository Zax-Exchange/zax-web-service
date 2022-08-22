import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { ProjectStatus } from "../../graphql/resolvers-types";
import type { companies, companiesId } from "./companies";
import type { project_bids, project_bidsId } from "./project_bids";
import type {
  project_components,
  project_componentsId,
} from "./project_components";
import { project_designs, project_designsId } from "./project_designs";
import type {
  project_permissions,
  project_permissionsId,
} from "./project_permissions";
import type { users, usersId } from "./users";

export interface projectsAttributes {
  id: string;
  userId: string;
  companyId: string;
  name: string;
  deliveryDate: string;
  deliveryAddress: string;
  budget: number;
  status: ProjectStatus;
  comments?: string;
  updatedAt: Date;
  createdAt: Date;
}

export type projectsPk = "id";
export type projectsId = projects[projectsPk];
export type projectsOptionalAttributes = "createdAt" | "updatedAt" | "comments";
export type projectsCreationAttributes = Optional<
  projectsAttributes,
  projectsOptionalAttributes
>;

export class projects
  extends Model<projectsAttributes, projectsCreationAttributes>
  implements projectsAttributes
{
  id!: string;
  userId!: string;
  companyId!: string;
  name!: string;
  deliveryDate!: string;
  deliveryAddress!: string;
  budget!: number;
  status!: ProjectStatus;
  comments?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // projects belongsTo companies via companyId
  company!: companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<companies, companiesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<companies>;
  // projects hasMany project_bids via projectId
  project_bids!: project_bids[];
  getProject_bids!: Sequelize.HasManyGetAssociationsMixin<project_bids>;
  setProject_bids!: Sequelize.HasManySetAssociationsMixin<
    project_bids,
    project_bidsId
  >;
  addProject_bid!: Sequelize.HasManyAddAssociationMixin<
    project_bids,
    project_bidsId
  >;
  addProject_bids!: Sequelize.HasManyAddAssociationsMixin<
    project_bids,
    project_bidsId
  >;
  createProject_bid!: Sequelize.HasManyCreateAssociationMixin<project_bids>;
  removeProject_bid!: Sequelize.HasManyRemoveAssociationMixin<
    project_bids,
    project_bidsId
  >;
  removeProject_bids!: Sequelize.HasManyRemoveAssociationsMixin<
    project_bids,
    project_bidsId
  >;
  hasProject_bid!: Sequelize.HasManyHasAssociationMixin<
    project_bids,
    project_bidsId
  >;
  hasProject_bids!: Sequelize.HasManyHasAssociationsMixin<
    project_bids,
    project_bidsId
  >;
  countProject_bids!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany project_components via projectId
  project_components!: project_components[];
  getProject_components!: Sequelize.HasManyGetAssociationsMixin<project_components>;
  setProject_components!: Sequelize.HasManySetAssociationsMixin<
    project_components,
    project_componentsId
  >;
  addProject_component!: Sequelize.HasManyAddAssociationMixin<
    project_components,
    project_componentsId
  >;
  addProject_components!: Sequelize.HasManyAddAssociationsMixin<
    project_components,
    project_componentsId
  >;
  createProject_component!: Sequelize.HasManyCreateAssociationMixin<project_components>;
  removeProject_component!: Sequelize.HasManyRemoveAssociationMixin<
    project_components,
    project_componentsId
  >;
  removeProject_components!: Sequelize.HasManyRemoveAssociationsMixin<
    project_components,
    project_componentsId
  >;
  hasProject_component!: Sequelize.HasManyHasAssociationMixin<
    project_components,
    project_componentsId
  >;
  hasProject_components!: Sequelize.HasManyHasAssociationsMixin<
    project_components,
    project_componentsId
  >;
  countProject_components!: Sequelize.HasManyCountAssociationsMixin;
  // projects hasMany project_permissions via projectId
  project_permissions!: project_permissions[];
  getProject_permissions!: Sequelize.HasManyGetAssociationsMixin<project_permissions>;
  setProject_permissions!: Sequelize.HasManySetAssociationsMixin<
    project_permissions,
    project_permissionsId
  >;
  addProject_permission!: Sequelize.HasManyAddAssociationMixin<
    project_permissions,
    project_permissionsId
  >;
  addProject_permissions!: Sequelize.HasManyAddAssociationsMixin<
    project_permissions,
    project_permissionsId
  >;
  createProject_permission!: Sequelize.HasManyCreateAssociationMixin<project_permissions>;
  removeProject_permission!: Sequelize.HasManyRemoveAssociationMixin<
    project_permissions,
    project_permissionsId
  >;
  removeProject_permissions!: Sequelize.HasManyRemoveAssociationsMixin<
    project_permissions,
    project_permissionsId
  >;
  hasProject_permission!: Sequelize.HasManyHasAssociationMixin<
    project_permissions,
    project_permissionsId
  >;
  hasProject_permissions!: Sequelize.HasManyHasAssociationsMixin<
    project_permissions,
    project_permissionsId
  >;
  countProject_permissions!: Sequelize.HasManyCountAssociationsMixin;
  // projects belongsTo users via userId
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // projects hasMany project_designs via projectId
  project_designs!: project_designs[];
  getProject_design!: Sequelize.HasOneGetAssociationMixin<project_designs>;

  static initModel(sequelize: Sequelize.Sequelize): typeof projects {
    return sequelize.define(
      "projects",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        deliveryDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        deliveryAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        budget: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "companies",
            key: "id",
          },
        },
        comments: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "projects",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        hooks: {
          // beforeDestroy: async (instance, options) => {
          //   const transaction = await sequelize.transaction();
          //   try {
          //     await instance.getProject_components().then(async (comps) => {
          //       for (let comp of comps) await comp.destroy({ transaction });
          //     });
          //     await instance.getProject_permissions().then(async (ps) => {
          //       for (let p of ps) await p.destroy({ transaction });
          //     });
          //     await instance.getProject_design().then(async (d) => {
          //       await d.destroy({ transaction });
          //     });
          //     await transaction.commit();
          //   } catch (error) {
          //     console.error(error);
          //     await transaction.rollback();
          //   }
          // },
        },
        indexes: [
          {
            name: "projects_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof projects;
  }
}
