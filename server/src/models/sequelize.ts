import { Op, Sequelize } from "sequelize";

export const sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
    operatorsAliases: Op,
});

// export const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./test.db",
//     logging: false,
// });
