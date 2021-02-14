import { DataTypes, Model, Optional } from "sequelize";
import { HookEvent, sequelize } from "./";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuid } from "uuid";

export interface TargetResponseAttributes {
    id: string;
    data: string;
    status: number;
    headers: object;
    hookEventId: string;
}

export interface TargetResponseCreationAttributes
    extends Optional<TargetResponseAttributes, "id"> {}

@ObjectType()
export class TargetResponse
    extends Model<TargetResponseAttributes, TargetResponseCreationAttributes>
    implements TargetResponseAttributes {
    @Field()
    id: string;
    @Field()
    data: string;
    @Field()
    status: number;
    @Field(() => String)
    headers: object;
    @Field()
    hookEventId: string;
}

TargetResponse.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        data: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        headers: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        hookEventId: {
            type: DataTypes.STRING,
            allowNull: false,
            key: "hook_event_id",
        },
    },
    {
        tableName: "target_responses",
        sequelize,
    },
);
