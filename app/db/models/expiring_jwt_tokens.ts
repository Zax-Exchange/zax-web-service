import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface expiring_jwt_tokensAttributes {
  id: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export type expiring_jwt_tokensPk = "id";
export type expiring_jwt_tokensId = expiring_jwt_tokens[expiring_jwt_tokensPk];
export type expiring_jwt_tokensOptionalAttributes = "createdAt" | "updatedAt";
export type expiring_jwt_tokensCreationAttributes = Optional<
  expiring_jwt_tokensAttributes,
  expiring_jwt_tokensOptionalAttributes
>;

export class expiring_jwt_tokens
  extends Model<
    expiring_jwt_tokensAttributes,
    expiring_jwt_tokensCreationAttributes
  >
  implements expiring_jwt_tokensAttributes
{
  id!: string;
  token!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof expiring_jwt_tokens {
    return sequelize.define(
      "expiring_jwt_tokens",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        token: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: "expiring_jwt_tokens",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "expiring_jwt_tokens_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof expiring_jwt_tokens;
  }
}
