import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { BidIntentStatus } from "../../graphql/resolvers-types.generated";
import type { companies, companiesId } from "./companies";
import { projects } from "./projects";

export interface project_invitationsAttributes {
  id: string;
  projectId: string;
  vendorCompanyId: string;
  customerCompanyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type project_invitationsPk = "id";
export type project_invitationsId = project_invitations[project_invitationsPk];
export type project_invitationsOptionalAttributes = "createdAt" | "updatedAt";
export type project_invitationsCreationAttributes = Optional<
  project_invitationsAttributes,
  project_invitationsOptionalAttributes
>;

export class project_invitations
  extends Model<
    project_invitationsAttributes,
    project_invitationsCreationAttributes
  >
  implements project_invitationsAttributes
{
  id!: string;
  projectId!: string;
  vendorCompanyId!: string;
  customerCompanyId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // project_invitations belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;

  // project_invitations belongsTo vendors via vendorCompanyId
  vendor!: companies;
  getVendor!: Sequelize.BelongsToGetAssociationMixin<companies>;

  // project_invitations belongsTo customers via customerCompanyId
  customer!: companies;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<companies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof project_invitations {
    return sequelize.define(
      "project_invitations",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        customerCompanyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "companies",
            key: "id",
          },
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "projects",
            key: "id",
          },
          unique: "project_invitations_id_projectId_vendorCompanyId_key",
        },
        vendorCompanyId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "companies",
            key: "id",
          },
          unique: "project_invitations_id_projectId_vendorCompanyId_key",
        },
      },
      {
        tableName: "project_invitations",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "project_invitations_id_projectId_vendorCompanyId_key",
            unique: true,
            fields: [{ name: "projectId" }, { name: "vendorCompanyId" }],
          },
        ],
      }
    ) as typeof project_invitations;
  }
}
