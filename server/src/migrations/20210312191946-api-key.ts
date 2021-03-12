import { DataTypes } from 'sequelize';
import { sequelize } from '../models';
import { User } from '../models';
import { v4 as uuid } from 'uuid';

const queryInterface = sequelize.getQueryInterface();

export const up = async () => {
    // const transaction = await sequelize.transaction();
    await sequelize.authenticate();
    await queryInterface.addColumn(User.getTableName(), 'api_key', {
        type: DataTypes.STRING,
        allowNull: true,
    });
    const users = await User.findAll();
    await Promise.all(
        users.map((user) => {
            console.log(user);
            user.apiKey = uuid();
            return user.save();
        }),
    );
    await queryInterface.changeColumn(User.getTableName(), 'api_key', {
        type: DataTypes.STRING,
        allowNull: false,
    });
};

export const down = async () => {
    await queryInterface.removeColumn(User.getTableName(), 'apiKey');
};
