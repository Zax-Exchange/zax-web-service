import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface projectComponentChangelogsAttributes {
  projectComponentId: string;
  id: string;
  projectComponentSpecId: string | null;
  propertyName: string;
  oldValue: object | null;
  newValue: object | null;
  createdAt: Date;
}

export type projectComponentChangelogsOptionalAttributes = "oldValue" | "newValue" | "projectComponentSpecId"
export type projectComponentChangelogsCreationAttributes = Optional<
  projectComponentChangelogsAttributes,
  projectComponentChangelogsOptionalAttributes
>;

export class project_component_changelogs 
  extends Model<projectComponentChangelogsAttributes, projectComponentChangelogsCreationAttributes>
  implements projectComponentChangelogsAttributes 
{
  projectComponentId!: string;
  projectComponentSpecId!: string | null;
  id!: string;
  propertyName!: string;
  oldValue!: any;
  newValue!: any;
  createdAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_component_changelogs {
    return sequelize.define(
      "project_component_changelogs",
      {
        projectComponentId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "project_components",
            key: "id"
          }
        },
        projectComponentSpecId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "component_specs",
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
        tableName: "project_component_changelogs",
        schema: "public",
        hasTrigger: true,
        timestamps: true,
        indexes: [
          {
            name: "project_component_changelogs_pkey",
            unique: true,
            fields: [{name: "id"}, {name: "propertyName"}]
          },
          {
            name: "project_component_changelogs_componentid_fkey",
            unique: false,
            fields: [{name: "projectComponentId"}]
          },
          {
            name: "project_component_changelogs_specid_fkey",
            unique: false,
            fields: [{name: "projectComponentSpecId"}]
          }
        ]
      }
    ) as typeof project_component_changelogs;
  }
}