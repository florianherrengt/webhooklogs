import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { ObjectType, Field } from 'type-graphql';
import { v4 as uuid } from 'uuid';

export interface UserAttributes {
    id: string;
    username: string;
    email?: string;
    githubId?: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

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
