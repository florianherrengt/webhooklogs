import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field } from 'type-graphql';
import { v4 as uuid } from 'uuid';

export interface HookEventAttributes {
    id: string;
    method: string;
    headers: object;
    body?: object;
    applicationId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectCreationAttributes
    extends Optional<HookEventAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

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
    @Field(() => String)
    createdAt: Date;
    @Field(() => String)
    updatedAt: Date;
}

HookEvent.init(
    {
        id: {
            type: DataTypes.UUID,
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
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE(0),
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'hook_events',
        underscored: true,
        sequelize,
    },
);
