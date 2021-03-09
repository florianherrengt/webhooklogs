import express, { Router } from 'express';
import supertest from 'supertest';
import { Application, HookEvent, TargetResponse, User } from '../models';
import { gql } from 'apollo-server-express';
import { print } from 'graphql/language/printer';
import { cache } from '../cache';
import { omit } from 'lodash';
import { createApp } from '../app';
import { createJwt } from '../helpers/createJwt';
import * as testHelpers from '../helpers/testHelpers';
import { testApp } from '../testApp/testApp';
import faker from 'faker';
import http from 'http';
import { Op } from 'sequelize';

describe('resolvers/Applications', () => {
    let app: express.Application;
    let agent: supertest.SuperTest<supertest.Test>;
    const testAppPort = faker.random.number({ min: 5001, max: 6000 });

    const testAppUrl = `http://localhost:${testAppPort}`;
    let testServer: http.Server;

    beforeAll(async () => {
        app = (await createApp()).app;
        agent = supertest(app);

        await new Promise((resolve) => {
            testServer = testApp.listen(testAppPort, () => resolve(null));
        });
    });
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterAll(async () => {
        await new Promise((resolve) => {
            testServer.close(resolve);
        });
    });
    describe('get', () => {
        test('no path', async () => {
            const user = await testHelpers.createUser();
            const application = await testHelpers.createApplication({
                userId: user.id,
                targetUrl: testAppUrl,
            });

            await agent.get(`/api/webhook/${application.id}`).expect(200);
            const [{ targetResponse }] = await HookEvent.findAll({
                where: { applicationId: { [Op.eq]: application.id } },
                include: [
                    { model: TargetResponse as any, as: 'targetResponse' },
                ],
            });
            expect(targetResponse).toEqual(
                expect.objectContaining({
                    data: expect.objectContaining({
                        ok: 1,
                        url: '/',
                        body: {},
                        method: 'GET',
                        status: 200,
                    }),
                    status: 200,
                    headers: expect.objectContaining({
                        connection: 'close',
                        'content-type': 'application/json; charset=utf-8',
                        'x-powered-by': 'Express',
                        'content-length': '181',
                    }),
                }),
            );
        });
        test('/test/hello/hi path', async () => {
            const user = await testHelpers.createUser();
            const application = await testHelpers.createApplication({
                userId: user.id,
                targetUrl: testAppUrl,
            });

            await agent
                .get(`/api/webhook/${application.id}/test/hello/hi`)
                .set('custom-header', 'ch')
                .expect(200);
            const [hookEvent] = await HookEvent.findAll({
                where: { applicationId: { [Op.eq]: application.id } },
            });
            expect(hookEvent.headers).toEqual(
                expect.objectContaining({
                    'custom-header': 'ch',
                }),
            );
            expect(hookEvent.path).toEqual('/test/hello/hi');
        });
    });
    describe('post', () => {
        test('json', async () => {
            const user = await testHelpers.createUser();
            const application = await testHelpers.createApplication({
                userId: user.id,
                targetUrl: testAppUrl,
            });

            await agent
                .post(`/api/webhook/${application.id}`)
                .send({ hello: 'world' })
                .expect(200);
            const [hookEvent] = await HookEvent.findAll({
                where: { applicationId: { [Op.eq]: application.id } },
            });
            expect(hookEvent.body).toEqual({ hello: 'world' });
        });
    });
});
