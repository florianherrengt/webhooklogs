import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// export const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./test.db",
//     logging: false,
// });
