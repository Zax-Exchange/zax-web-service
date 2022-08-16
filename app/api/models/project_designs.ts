import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { projects, projectsId } from "./projects";

export interface project_designsAttributes {
  id: string;
  projectId?: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type project_designsPk = "id";
export type project_designsId = project_designs[project_designsPk];
export type project_designsOptionalAttributes = "projectId" | "createdAt" | "updatedAt" | "deletedAt";
export type project_designsCreationAttributes = Optional<
  project_designsAttributes,
  project_designsOptionalAttributes
>;

export class project_designs
  extends Model<project_designsAttributes, project_designsCreationAttributes>
  implements project_designsAttributes
{
  id!: string;
  projectId?: string;
  fileName!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // project_designs belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  hasProject!: Sequelize.HasOneGetAssociationMixin<projects>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_designs {
    return sequelize.define(
      "project_designs",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "projects",
            key: "id",
          },
          onDelete: "cascade",
        },
        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "project_designs",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "project_designs_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof project_designs;
  }
}