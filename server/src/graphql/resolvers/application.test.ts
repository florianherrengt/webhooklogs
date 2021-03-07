import express, { Router } from 'express';
import supertest from 'supertest';
import { Application, User } from '../../models';
import { gql } from 'apollo-server-express';
import { print } from 'graphql/language/printer';
import { cache } from '../../cache';
import { omit } from 'lodash';
import { createApp } from '../../app';
import { createJwt } from '../../helpers/createJwt';
import * as testHelpers from '../../helpers/testHelpers';

describe('resolvers/Applications', () => {
    let app: express.Application;
    let agent: supertest.SuperTest<supertest.Test>;
    beforeAll(async () => {
        app = (await createApp()).app;
        // app.use('/api', graphqlRouter);
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

        const results1 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user.id })}`);

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

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user.id })}`);
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
    test('applications', async () => {
        const user1 = await User.create({
            username: 'user1',
            stripeCustomerId: 'sci',
            email: 'hello@test.com',
            githubId: 'github_id',
        });
        const user2 = await User.create({
            username: 'user2',
            stripeCustomerId: 'sci',
            email: 'hello@test.com',
            githubId: 'github_id',
        });
        const application1 = await Application.create({
            name: 'app1',
            userId: user1.id,
        });
        const application2 = await Application.create({
            name: 'app2',
            userId: user1.id,
        });
        const application3 = await Application.create({
            name: 'app3',
            userId: user2.id,
        });
        const query = {
            query: print(gql`
                query applications {
                    applications {
                        id
                    }
                }
            `),
        };

        const results1 = await agent.post('/api/graphql').send(query);
        expect(results1.body.data.applications).toEqual([]);

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);
        expect(
            results2.body.data.applications.map(({ id }: any) => id),
        ).toEqual([application1.id, application2.id]);

        const results3 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);
        expect(
            results3.body.data.applications.map(({ id }: any) => id),
        ).toEqual([application3.id]);
    });
    test('createApplication', async () => {
        const user = await testHelpers.createUser();

        const variables = { input: { name: 'my app' } };
        const query = {
            query: print(gql`
                mutation createApplication($input: CreateApplicationInput!) {
                    createApplication(input: $input) {
                        id
                    }
                }
            `),
            variables,
        };

        const results = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user.id })}`);

        expect(
            Application.findByPk(results.body.data.createApplication.id),
        ).resolves.not.toBeNull();
    });
    test('updateApplication', async () => {
        const user1 = await testHelpers.createUser();
        const user2 = await testHelpers.createUser();

        const application = await testHelpers.createApplication({
            userId: user1.id,
        });

        const variables = { input: { id: application.id, name: 'my app' } };
        const query = {
            query: print(gql`
                mutation updateApplicationById(
                    $input: UpdateApplicationInput!
                ) {
                    updateApplicationById(input: $input) {
                        id
                        name
                    }
                }
            `),
            variables,
        };

        const results = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);

        expect(results.body.errors[0].message).toEqual(
            expect.stringContaining('Access denied'),
        );

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);

        await expect(Application.findByPk(application.id)).resolves.toEqual(
            expect.objectContaining({ name: 'my app' }),
        );
        expect(results2.body.data.updateApplicationById).toEqual({
            id: application.id,
            name: 'my app',
        });
    });
    test('deleteApplication', async () => {
        const user1 = await testHelpers.createUser();
        const user2 = await testHelpers.createUser();

        const application = await testHelpers.createApplication({
            userId: user1.id,
        });

        const variables = { id: application.id };
        const query = {
            query: print(gql`
                mutation deleteApplicationById($id: String!) {
                    deleteApplicationById(id: $id)
                }
            `),
            variables,
        };

        const results = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);

        expect(results.body.errors[0].message).toEqual(
            expect.stringContaining('Access denied'),
        );

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);

        await expect(Application.findByPk(application.id)).resolves.toEqual(
            null,
        );
        expect(results2.body.data.deleteApplicationById).toEqual(1);

        const results3 = await agent
            .post('/api/graphql')
            .send({
                query: print(gql`
                    query applicationById($id: String!) {
                        applicationById(id: $id) {
                            id
                        }
                    }
                `),
                variables: { id: application.id },
            })
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);

        expect(results3.body.errors[0].message).toEqual(
            expect.stringContaining('Access denied'),
        );
    });
});
