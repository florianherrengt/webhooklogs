import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { publish } from '../pubSub';
import { HookEvent } from './HookEvent';

export interface TargetResponseAttributes {
    id: string;
    data: object;
    status: number;
    headers: object;
    hookEventId: string;
}

export interface TargetResponseGraphqlAttributes {
    id: string;
    data: string;
    status: number;
    headers: string;
    hookEventId: string;
}

export interface TargetResponseCreationAttributes
    extends Optional<TargetResponseAttributes, 'id'> {}

@ObjectType()
export class TargetResponse
    extends Model<TargetResponseAttributes, TargetResponseCreationAttributes>
    implements TargetResponseAttributes {
    @Field()
    id: string;
    @Field(() => String)
    data: object;
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
            type: DataTypes.UUID,
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
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: 'target_responses',
        underscored: true,
        sequelize,
    },
);

TargetResponse.afterCreate(async (targetResponse) => {
    const hookEvent = await HookEvent.findByPk(targetResponse.hookEventId);
    if (!hookEvent) {
        return;
    }
    publish.updateHookEvent(hookEvent);
});
