import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface projectChangelogAttributes {
  projectId: string;
  id: string;
  index: number;
  propertyName: string;
  oldValue: object | null;
  newValue: object | null;
  changeTime: Date;
}

export type projectChangelogOptionalAttributes = "oldValue" | "newValue"
export type projectCreationAttributes = Optional<
  projectChangelogAttributes,
  projectChangelogOptionalAttributes
>;

export class project_changelog 
  extends Model<projectChangelogAttributes, projectCreationAttributes>
  implements projectChangelogAttributes 
{
  projectId!: string;
  id!: string;
  index!: number;
  propertyName!: string;
  oldValue!: any;
  newValue!: any;
  changeTime!: Date;

  // projectChangelog belongs to project via projectId
  // projectChangelog might have a projectBidChangelog

  static initModel(sequelize: Sequelize.Sequelize): typeof project_changelog {
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
        index: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        propertyName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        oldValue: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        newValue: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        changeTime: {
          type: DataTypes.DATE,
          allowNull: false
        },
      },
      {
        tableName: "project_changelog",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "project_changelog_pkey",
            unique: true,
            fields: [{name: "id"}, {name: "index"}]
          },
          {
            name: "projectid_foreign_key_search_index",
            unique: false,
            fields: [{name: "projectId"}]
          },
        ]
      }
    ) as typeof project_changelog;
  }
}