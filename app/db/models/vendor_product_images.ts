import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { companies } from "./companies";

export interface vendor_product_imagesAttributes {
  id: string;
  companyId?: string;
  fileName: string;
  productType?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type vendor_product_imagesPk = "id";
export type vendor_product_imagesId =
  vendor_product_images[vendor_product_imagesPk];
export type vendor_product_imagesOptionalAttributes = "createdAt" | "updatedAt";
export type vendor_product_imagesCreationAttributes = Optional<
  vendor_product_imagesAttributes,
  vendor_product_imagesOptionalAttributes
>;

export class vendor_product_images
  extends Model<
    vendor_product_imagesAttributes,
    vendor_product_imagesCreationAttributes
  >
  implements vendor_product_imagesAttributes
{
  id!: string;
  companyId?: string;
  fileName!: string;
  productType?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // vendor_product_images belongsTo projects via projectId
  company!: companies;
  getProject!: Sequelize.BelongsToGetAssociationMixin<companies>;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof vendor_product_images {
    return sequelize.define(
      "vendor_product_images",
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
        productType: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "vendor_product_images",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "vendor_product_images_pKey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    ) as typeof vendor_product_images;
  }
}
