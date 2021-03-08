import { Application, HookEvent, User } from '../models';
import faker from 'faker';

export const createUser = (): Promise<User> => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName(firstName, lastName);
    return User.create({
        username,
        stripeCustomerId: `${username}_stripe_customer_id`,
        email: faker.internet.email(firstName, lastName),
        githubId: `${username}_github_id`,
    });
};

export const createApplication = ({
    userId,
}: {
    userId: string;
}): Promise<Application> => {
    return Application.create({
        name: faker.random.words(),
        userId,
    });
};

export const createHookEvent = ({
    applicationId,
}: {
    applicationId: string;
}) => {
    return HookEvent.create({
        headers: {},
        body: {},
        method: 'get',
        path: '/',
        applicationId,
    });
};
