import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface materialsAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type materialsPk = "id";
export type materialsId = materials[materialsPk];
export type materialsOptionalAttributes = "createdAt" | "updatedAt";
export type materialsCreationAttributes = Optional<materialsAttributes, materialsOptionalAttributes>;

export class materials extends Model<materialsAttributes, materialsCreationAttributes> implements materialsAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof materials {
    return sequelize.define('materials', {
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
      unique: "materials_name_key"
    }
  }, {
    tableName: 'materials',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "materials_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "materials_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof materials;
  }
}
