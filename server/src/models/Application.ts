import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field, InputType } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { cache } from '../cache';

export interface ApplicationAttributes {
    id: string;
    name: string;
    targetUrl?: string;
    userId: string;
}

export interface ApplicationCreationAttributes
    extends Omit<ApplicationAttributes, 'id'> {}

@InputType()
export class CreateApplicationInput
    implements Omit<ApplicationCreationAttributes, 'userId'> {
    @Field((type) => String)
    name: string;
    @Field((type) => String, { nullable: true })
    targetUrl?: string;
}

@InputType()
export class UpdateApplicationInput
    implements Partial<Omit<ApplicationAttributes, 'userId'>> {
    @Field((type) => String)
    id: string;
    @Field((type) => String, { nullable: true })
    name?: string;
    @Field((type) => String, { nullable: true })
    targetUrl?: string;
}

@ObjectType()
export class Application
    extends Model<ApplicationAttributes, ApplicationCreationAttributes>
    implements ApplicationAttributes {
    @Field()
    id: string;
    @Field((type) => String)
    name: string;
    @Field((type) => String, { nullable: true })
    targetUrl?: string;
    @Field((type) => String)
    userId: string;
}

Application.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notContains: 'webhooklogs.com',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: 'applications',
        underscored: true,
        sequelize,
    },
);

Application.afterUpdate((application) => {
    cache.application.unset(application.id);
});

Application.afterDestroy((application) => {
    cache.application.unset(application.id);
});
