import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { companies } from "./companies";

export interface vendor_certificationsAttributes {
  id: string;
  companyId: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type vendor_certificationsPk = "id";
export type vendor_certificationsId =
  vendor_certifications[vendor_certificationsPk];
export type vendor_certificationsOptionalAttributes = "createdAt" | "updatedAt";
export type vendor_certificationsCreationAttributes = Optional<
  vendor_certificationsAttributes,
  vendor_certificationsOptionalAttributes
>;

export class vendor_certifications
  extends Model<
    vendor_certificationsAttributes,
    vendor_certificationsCreationAttributes
  >
  implements vendor_certificationsAttributes
{
  id!: string;
  companyId!: string;
  fileName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // vendor_certifications belongsTo projects via projectId
  company!: companies;
  getProject!: Sequelize.BelongsToGetAssociationMixin<companies>;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof vendor_certifications {
    return sequelize.define(
      "vendor_certifications",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "companies",
            key: "id",
          },
        },
        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "vendor_certifications",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "vendor_certifications_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof vendor_certifications;
  }
}
