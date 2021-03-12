import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field, InputType } from 'type-graphql';
import { v4 as uuid } from 'uuid';

export interface UserAttributes {
    id: string;
    username: string;
    email?: string;
    githubId?: string;
    stripeCustomerId: string;
    apiKey: string;
}

export interface UserCreationAttributes
    extends Omit<UserAttributes, 'id' | 'isSubscribed' | 'apiKey'> {}

@InputType()
export class UpdateUserInput
    implements Pick<UserAttributes, 'username' | 'email'> {
    @Field((type) => String, { nullable: true })
    username: string;
    @Field((type) => String, { nullable: true })
    email: string;
}

@ObjectType()
export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    @Field()
    id: string;
    @Field({ nullable: true })
    email?: string;
    @Field()
    username: string;
    @Field({ nullable: true })
    githubId?: string;
    @Field()
    stripeCustomerPortalLink: string;
    @Field()
    stripeCustomerId: string;
    @Field()
    hasPaymentMethod: boolean;
    @Field()
    isSubscriptionValid: boolean;
    @Field()
    apiKey: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        githubId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stripeCustomerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: () => uuid(),
        },
    },
    {
        tableName: 'user',
        underscored: true,
        sequelize,
        validate: {
            atLeastOneProvider() {
                if (!(this.githubId || this.email)) {
                    throw new Error(
                        'User need an email address or a provider id',
                    );
                }
            },
        },
    },
);
