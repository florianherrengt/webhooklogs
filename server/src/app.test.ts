jest.mock('./helpers/createJwt');

import { createApp } from './app';
import supertest, { SuperTest, Test } from 'supertest';
import { verifyJwt as _verifyJwt } from './helpers/createJwt';

const verifyJwt: jest.Mock = _verifyJwt as any;

describe('app', () => {
    let agent: SuperTest<Test>;
    beforeAll(async () => {
        const { app } = await createApp();
        agent = supertest(app);
    });
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test('/healthz', async () => {
        await agent.get('/api/healthz').expect(200);
        expect(verifyJwt).not.toHaveBeenCalled();
    });
    test('/auth', async () => {
        await agent.get('/api/auth/github').expect(302);
        await agent.get('/api/auth/github/callback').expect(302);
        expect(verifyJwt).not.toHaveBeenCalled();
    });
    test('/config', async () => {
        await agent.get('/api/config').expect(401);
        expect(verifyJwt).not.toHaveBeenCalled();
    });
    test('/config', async () => {
        await agent
            .post('/api/graphql')
            .set('authorization', 'Bearer invalidtoken')
            .send({
                query: '{\n  healthz {\n    ok\n  }\n}\n',
            })
            .expect(200);
        expect(verifyJwt).toHaveBeenCalled();
    });
    test('/webhook', async () => {
        const { body } = await agent.get('/api/webhook/app123').expect(404);
        expect(body).toEqual({
            error: 'no application with id: app123 found.',
        });
        expect(verifyJwt).not.toHaveBeenCalled();
    });
});
