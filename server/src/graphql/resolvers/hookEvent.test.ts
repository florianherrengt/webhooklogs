import express, { Router } from 'express';
import supertest from 'supertest';
import { Application, HookEvent, User } from '../../models';
import { gql } from 'apollo-server-express';
import { print } from 'graphql/language/printer';
import { cache } from '../../cache';
import { omit } from 'lodash';
import { createApp } from '../../app';
import { createJwt } from '../../helpers/createJwt';
import * as testHelpers from '../../helpers/testHelpers';

describe('resolvers/hookEvents', () => {
    let app: express.Application;
    let agent: supertest.SuperTest<supertest.Test>;
    beforeAll(async () => {
        app = (await createApp()).app;
        agent = supertest(app);
    });
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test('hookEventById', async () => {
        const user1 = await testHelpers.createUser();
        const user2 = await testHelpers.createUser();
        const application = await testHelpers.createApplication({
            userId: user2.id,
        });
        const hookEvent = await testHelpers.createHookEvent({
            applicationId: application.id,
        });

        const query = {
            query: print(gql`
                query hookEventById($id: String!) {
                    hookEventById(id: $id) {
                        id
                        method
                        headers
                        path
                        body
                        applicationId
                        createdAt
                        updatedAt
                        targetResponse {
                            id
                            data
                            headers
                            status
                        }
                    }
                }
            `),
            variables: { id: hookEvent.id },
        };

        const results1 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);

        expect(results1.body.errors[0].message).toEqual(
            expect.stringContaining('Access denied'),
        );

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);
        expect(results2.error).toBeFalsy();
        expect(results2.body.errors).toBeUndefined();
        expect(results2.body.data.hookEventById.id).toEqual(hookEvent.id);
    });
    test('hookEvents', async () => {
        const user1 = await testHelpers.createUser();
        const user2 = await testHelpers.createUser();
        const application = await testHelpers.createApplication({
            userId: user2.id,
        });

        // for (const index in Array(150).fill(null)) {
        //     await HookEvent.create({
        //         applicationId: application.id,
        //         headers: {},
        //         method: 'get',
        //         path: `/${index}`,
        //         body: {},
        //     });
        // }

        await HookEvent.bulkCreate(
            Array(150)
                .fill(null)
                .map((_, index) => ({
                    applicationId: application.id,
                    headers: {},
                    method: 'get',
                    path: `/${index}`,
                    body: {},
                    createdAt: new Date(100000000000 * index),
                })),
        );

        const query = {
            query: print(gql`
                query hookEvents(
                    $where: HookEventWhereFields!
                    $cursor: PaginationCursorFields
                ) {
                    hookEvents(where: $where, cursor: $cursor) {
                        items {
                            id
                            path
                        }
                        total
                        hasMore
                    }
                }
            `),
            variables: {
                where: { applicationId: { eq: application.id } },
            },
        };

        const results1 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user1.id })}`);

        expect(results1.error).toBeFalsy();
        expect(results1.body.errors[0].message).toEqual(
            expect.stringContaining('Access denied'),
        );

        const results2 = await agent
            .post('/api/graphql')
            .send(query)
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);
        expect(results2.error).toBeFalsy();
        expect(results2.body.errors).toBeUndefined();
        expect(results2.body.data.hookEvents.items).toHaveLength(100);
        expect(results2.body.data.hookEvents.total).toEqual(150);
        expect(results2.body.data.hookEvents.hasMore).toEqual(true);
        expect(results2.body.data.hookEvents.items[0].path).toEqual('/149');

        const lastItem =
            results2.body.data.hookEvents.items[
                results2.body.data.hookEvents.items.length - 1
            ];
        expect(lastItem.path).toEqual('/50');

        const results3 = await agent
            .post('/api/graphql')
            .send({
                ...query,
                variables: {
                    ...query.variables,
                    cursor: {
                        after: lastItem.id,
                    },
                },
            })
            .set('authorization', `Bearer ${createJwt({ userId: user2.id })}`);
        expect(results3.error).toBeFalsy();
        expect(results3.body.errors).toBeUndefined();
        expect(results3.body.data.hookEvents.items).toHaveLength(50);
        expect(results3.body.data.hookEvents.total).toEqual(150);
        expect(results3.body.data.hookEvents.hasMore).toEqual(false);
        expect(results3.body.data.hookEvents.items[0].path).toEqual('/49');
        expect(results3.body.data.hookEvents.items[49].path).toEqual('/0');
    });
});
