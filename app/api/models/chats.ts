import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { project_bids, project_bidsId } from './project_bids';

export interface chatsAttributes {
    id: string;
    projectBidId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type chatsPk = "id"
export type chatsId = chats[chatsPk];
export type chatsOptionalAttributes = "deletedAt";
export type chatsCreationAttributes = Optional<chatsAttributes, chatsOptionalAttributes>

export class chats extends Model<chatsAttributes, chatsCreationAttributes> implements chatsAttributes {
    id!: string;
    projectBidId!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // chats belongsTo projectBids via projectBidsId
    projectBid!: project_bids;
    getProjectBid!: Sequelize.BelongsToGetAssociationMixin<project_bids>;
    
    // chats hasMany chat_lines via chatId

    static initModel(sequelize: Sequelize.Sequelize): typeof chats {
        return sequelize.define("chats", {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            projectBidId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "project_bids",
                    key: "id"
                },
                unique: "chats_project_bidsId_key",
                onDelete: 'cascade'
            }
        }, {
            tableName: "chats",
            schema: "public",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "chats_pkey",
                    unique: true,
                    fields: [
                        {name: "id"}
                    ]
                },
                {
                    name: "chats_project_bidsId_key",
                    unique: true,
                    fields: [
                        {name: "projectBidId"}
                    ]
                }
            ]
        }) as typeof chats;
    }
}