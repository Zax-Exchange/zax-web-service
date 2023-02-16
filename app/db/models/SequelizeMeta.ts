import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface sequelize_metaAttributes {
  name: string;
}

export type sequelize_metaPk = "name";
export type sequelize_metaId = sequelize_meta[sequelize_metaPk];
export type sequelize_metaCreationAttributes = sequelize_metaAttributes;

export class sequelize_meta extends Model<sequelize_metaAttributes, sequelize_metaCreationAttributes> implements sequelize_metaAttributes {
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof sequelize_meta {
    return sequelize.define('sequelize_meta', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'SequelizeMeta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "SequelizeMeta_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  }) as typeof sequelize_meta;
  }
}
