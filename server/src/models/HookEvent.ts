import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import {
    TargetResponse,
    TargetResponseGraphqlAttributes,
} from './TargetResponse';
import { NEW_HOOK_EVENT, publish, pubSub } from '../pubSub';

export interface HookEventAttributes {
    id: string;
    method: string;
    headers: object;
    body?: object;
    path: string;
    applicationId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface HookEventGraphqlAttributes {
    id: string;
    method: string;
    headers: string;
    body?: string;
    path: string;
    applicationId: string;
    createdAt: Date;
    updatedAt: Date;
    targetResponse?: TargetResponseGraphqlAttributes | null;
}

export interface HookEventCreationAttributes
    extends Optional<HookEventAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@ObjectType()
export class HookEvent
    extends Model<HookEventAttributes, HookEventCreationAttributes>
    implements HookEventAttributes {
    @Field()
    id: string;
    @Field()
    method: string;
    @Field((type) => String)
    headers: object;
    @Field((type) => String)
    body: object;
    @Field((type) => String)
    path: string;
    @Field((type) => String)
    applicationId: string;
    @Field((type) => TargetResponse, { nullable: true })
    targetResponse?: TargetResponse;
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
        path: {
            type: DataTypes.STRING,
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
        indexes: [
            {
                fields: ['application_id'],
                concurrently: true,
            },
        ],
        underscored: true,
        sequelize,
    },
);
HookEvent.afterCreate((hookEvent) => {
    publish.newHookEvent(hookEvent);
});
