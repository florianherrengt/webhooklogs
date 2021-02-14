import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuid } from "uuid";

export interface HookEventAttributes {
    id: string;
    method: string;
    headers: object;
    body?: object;
    applicationId: string;
}

export interface ProjectCreationAttributes
    extends Optional<HookEventAttributes, "id"> {}

@ObjectType()
export class HookEvent
    extends Model<HookEventAttributes, ProjectCreationAttributes>
    implements HookEventAttributes {
    @Field()
    id: string;
    @Field()
    method: string;
    @Field((type) => String)
    contentType: string;
    @Field((type) => String)
    headers: object;
    @Field((type) => String)
    body: object;
    @Field((type) => String)
    applicationId: string;
}

HookEvent.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        headers: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        body: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        applicationId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        tableName: "hook_events",
        underscored: true,
        sequelize,
    },
);
