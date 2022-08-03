import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';


export interface stripe_customersAttributes {
  id: string;
  customerId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type stripe_customersPk = "id";
export type stripe_customersId = stripe_customers[stripe_customersPk];
export type stripe_customersOptionalAttributes = "createdAt" | "updatedAt";
export type stripe_customersCreationAttributes = Optional<stripe_customersAttributes, stripe_customersOptionalAttributes>;


export class stripe_customers extends Model<stripe_customersAttributes, stripe_customersCreationAttributes> implements stripe_customersAttributes {
  id!: string;
  customerId!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof stripe_customers {
    return sequelize.define('stripe_customers', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      tableName: 'stripe_customers',
      schema: 'public',
      hasTrigger: true,
      timestamps: true,

      indexes: [
        {
          name: "stripe_customers_pkey",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof stripe_customers;
  }
}