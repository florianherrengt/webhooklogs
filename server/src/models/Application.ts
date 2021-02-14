import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuid } from "uuid";

export interface ApplicationAttributes {
    id: string;
    name: string;
    targetUrl: string;
    userId: string;
}

export interface ApplicationCreationAttributes
    extends Omit<ApplicationAttributes, "id"> {}

@ObjectType()
export class Application
    extends Model<ApplicationAttributes, ApplicationCreationAttributes>
    implements ApplicationAttributes {
    @Field()
    id: string;
    @Field((type) => String)
    contentType: string;
    @Field((type) => String)
    name: string;
    @Field((type) => String)
    targetUrl: string;
    @Field((type) => String)
    userId: string;
}

Application.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: () => uuid(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        tableName: "applications",
        underscored: true,
        sequelize,
    },
);
