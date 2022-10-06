import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface projectChangelogsAttributes {
  projectId: string;
  id: string;
  propertyName: string;
  oldValue: object | null;
  newValue: object | null;
  createdAt: Date;
}

export type projectChangelogsOptionalAttributes = "oldValue" | "newValue"
export type projectChangelogsCreationAttributes = Optional<
  projectChangelogsAttributes,
  projectChangelogsOptionalAttributes
>;

export class project_changelogs 
  extends Model<projectChangelogsAttributes, projectChangelogsCreationAttributes>
  implements projectChangelogsAttributes 
{
  projectId!: string;
  id!: string;
  propertyName!: string;
  oldValue!: any;
  newValue!: any;
  createdAt!: Date;

  // projectChangelog belongs to project via projectId
  // projectChangelog might have a projectBidChangelog

  static initModel(sequelize: Sequelize.Sequelize): typeof project_changelogs {
    return sequelize.define(
      "project_changelog",
      {
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
            key: "id"
          }
        },
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        propertyName: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false
        },
        oldValue: {
          type: DataTypes.JSON,
          allowNull: true
        },
        newValue: {
          type: DataTypes.JSON,
          allowNull: true
        },
      },
      {
        tableName: "project_changelogs",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "project_changelogs_pkey",
            unique: true,
            fields: [{name: "id"}, {name: "propertyName"}]
          },
          {
            name: "project_changelogs_projectid_foreign_key_search_index",
            unique: false,
            fields: [{name: "projectId"}]
          },
        ]
      }
    ) as typeof project_changelogs;
  }
}