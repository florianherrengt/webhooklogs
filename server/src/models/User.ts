import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuid } from "uuid";

export interface UserAttributes {
    id: string;
    email: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

@ObjectType()
export class User extends Model implements UserAttributes {
    @Field()
    id: string;
    @Field((type) => String)
    email: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "user",
        sequelize,
    },
);
