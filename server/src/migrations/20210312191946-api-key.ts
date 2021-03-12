import { QueryInterface, DataTypes } from 'sequelize';
import { sequelize } from '../models';
import { User } from '../models';
import { v4 as uuid } from 'uuid';

const queryInterface = sequelize.getQueryInterface();

export const up = async () => {
    const transaction = await sequelize.transaction();
    try {
        await queryInterface.addColumn(
            User.getTableName(),
            'apiKey',
            {
                type: DataTypes.STRING,
                allowNull: true,
            },
            { transaction },
        );
        const users = await User.findAll();
        console.log('-=====');
        await Promise.all(
            users.map((user) => {
                console.log(user);
                user.apiKey = uuid();
                return user.save({ transaction });
            }),
        );
        await queryInterface.changeColumn(
            User.getTableName(),
            'apiKey',
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            { transaction },
        );
        await transaction.commit();
    } catch (e) {
        console.log(e);
        transaction.rollback();
    }
};

export const down = async () => {
    await queryInterface.removeColumn(User.getTableName(), 'apiKey');
};
