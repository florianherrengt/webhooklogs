import faker from 'faker';
import { Application, HookEvent, TargetResponse, User } from '.';
import { sequelize } from './sequelize';

describe('sequelize models', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    test('models are connected to each other', async () => {
        const user = await User.create({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            githubId: 'github_id',
            stripeCustomerId: 'stripe_customer_id',
        });
        const application = await Application.create({
            name: faker.random.word(),
            targetUrl: faker.internet.url(),
            userId: user.id,
        });
        const hookEvent = await HookEvent.create({
            headers: {},
            method: 'GET',
            path: '/',
            applicationId: application.id,
        });
        const targetResponse = await TargetResponse.create({
            data: {},
            status: 200,
            headers: {},
            hookEventId: hookEvent.id,
        });
        expect(targetResponse.id).toBeDefined();
    });
    describe('User', () => {
        test('no email or provider id', async () => {
            await expect(User.create()).rejects.toBeDefined();
        });
    });
});
