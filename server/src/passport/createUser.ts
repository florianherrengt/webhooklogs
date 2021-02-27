import { config } from '../config';
import { stripe } from '../helpers/stripe';
import { sequelize, User, UserCreationAttributes } from '../models';

export const createUser = async (
    user: Omit<UserCreationAttributes, 'stripeCustomerId'>,
): Promise<User> => {
    const transaction = await sequelize.transaction();
    let rollbackCustomerId: string | null = null;
    try {
        const createdUser = await User.create(
            { ...user, stripeCustomerId: 'pending' },
            { transaction },
        );
        if (!createdUser) {
            throw new Error(`Fail to create user ${JSON.stringify(user)}`);
        }
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.username,
            metadata: { userId: createdUser.id },
        });
        rollbackCustomerId = customer.id;
        await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: config.stripe.priceId }],
            trial_period_days: 1,
        });

        createdUser.update({ stripeCustomerId: customer.id });

        await transaction.commit();
        return createdUser;
    } catch (error) {
        await transaction.rollback();
        if (rollbackCustomerId) {
            await stripe.customers.del(rollbackCustomerId);
        }
        throw error;
    }
};
