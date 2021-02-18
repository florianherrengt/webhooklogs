import { Op, Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize(config.database.url, {
    logging: false,
    operatorsAliases: Op,
});

// export const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./test.db",
//     logging: false,
// });
