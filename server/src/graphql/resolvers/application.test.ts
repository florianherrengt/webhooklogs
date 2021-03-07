import express, { Router } from 'express';
import { createGraphqlRouter } from '../router';
import supertest from 'supertest';
import { Application, User } from '../../models';
import { gql } from 'apollo-server-express';
import { print } from 'graphql/language/printer';
import { cache } from '../../cache';
import { omit } from 'lodash';

describe('resolvers/Applications', () => {
    let graphqlRouter: Router;
    let app: express.Application;
    let agent: supertest.SuperTest<supertest.Test>;
    beforeAll(async () => {
        graphqlRouter = (await createGraphqlRouter()).graphqlRouter;
        app = express();
        app.use('/api', graphqlRouter);
        agent = supertest(app);
    });
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {});
    test('applicationById', async () => {
        const user = await User.create({
            username: 'username',
            stripeCustomerId: 'stripe_customer_id',
            email: 'username@test.com',
            githubId: 'github_id',
        });
        const application = await Application.create({
            name: 'fake test app',
            userId: user.id,
        });

        const query = {
            query: print(gql`
                query applicationById($id: String!) {
                    applicationById(id: $id) {
                        id
                        name
                        targetUrl
                        userId
                        createdAt
                        updatedAt
                    }
                }
            `),
            variables: { id: application.id },
        };

        const results1 = await agent.post('/api/graphql').send(query);

        expect(results1.body.errors).toBeUndefined();
        expect(application.toJSON()).toEqual({
            ...results1.body.data.applicationById,
            createdAt: new Date(
                parseInt(results1.body.data.applicationById.createdAt, 10),
            ),
            updatedAt: new Date(
                parseInt(results1.body.data.applicationById.updatedAt, 10),
            ),
        });

        const cachedApplication = (await cache.all.get(
            `application:${application.id}`,
        )) as any;

        expect(
            omit(
                {
                    ...cachedApplication,
                    createdAt: new Date(cachedApplication.createdAt),
                    updatedAt: new Date(cachedApplication.updatedAt),
                },
                ['user_id'],
            ),
        ).toEqual(application.toJSON());

        application.targetUrl = 'http://target-url.com';
        await application.save();

        await expect(
            cache.all.get(`application:${application.id}`),
        ).resolves.toBeNull();

        const results2 = await agent.post('/api/graphql').send(query);
        expect(results2.body.errors).toBeUndefined();
        expect(application.toJSON()).toEqual({
            ...results2.body.data.applicationById,
            createdAt: new Date(
                parseInt(results1.body.data.applicationById.createdAt, 10),
            ),
            updatedAt: new Date(
                parseInt(results2.body.data.applicationById.updatedAt, 10),
            ),
        });
        expect(
            parseInt(results2.body.data.applicationById.updatedAt, 10),
        ).toBeGreaterThan(
            parseInt(results1.body.data.applicationById.updatedAt, 10),
        );
        expect(results2.body.data.applicationById.targetUrl).toEqual(
            'http://target-url.com',
        );
    });
});
