import 'reflect-metadata';
import './passport';
import express from 'express';
import * as bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { passportRouter } from './passport/router';
import { pubSub } from './pubSub';
import { resolvers } from './resolvers';
import { Application, HookEvent, sequelize, TargetResponse } from './models';
import cors from 'cors';

import axios from 'axios';
import { createGraphqlContext } from './graphqlContext';
import { verifyJwt } from './helpers/createJwt';
import { Sequelize } from 'sequelize/types';
import path from 'path';
import { configRouter } from './config';

type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const isSupportedMethod = (method: string): method is SupportedMethod =>
    ['GET', 'POST', 'PUT', 'DELETE'].includes(method);

const createApp = async (): Promise<{
    app: express.Express;
    apolloServer: ApolloServer;
    sequelize: Sequelize;
}> => {
    const app = express();
    app.use(cors());
    await sequelize.sync();

    app.get('/api/healthz', async (_, response) => {
        await sequelize.authenticate();
        response.json({ ok: 1 });
    });
    app.use(configRouter);
    app.use((request, _response, next) => {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        if (type === 'Bearer' && typeof token === 'string') {
            try {
                const jwtPayload = verifyJwt(token);
                request.user = { id: jwtPayload.userId };
            } catch (error) {
                console.error(error);
            }
        }
        next();
    });
    const schema = await buildSchema({
        resolvers,
        pubSub,
    });
    const apolloServer = new ApolloServer({
        schema,
        context: createGraphqlContext,
    });

    app.use('/api/graphql', apolloServer.getMiddleware({ path: '/' }));

    app.use('/api/auth', passportRouter);

    app.use(
        '/api/webhook/:appId',
        bodyParser.json(),
        async (request, response) => {
            const {
                // method,
                headers,
                body,
                params: { appId },
            } = request;
            if (!isSupportedMethod(request.method)) {
                return response
                    .status(501)
                    .json({ error: `${request.method} not supported yet` });
            }
            const application = await Application.findByPk(appId);
            if (!application) {
                return response
                    .status(404)
                    .json({ error: `no application with id: ${appId} found.` });
            }

            const hookEvent = await HookEvent.create({
                ...request,
                path: request.path || '/',
                headers: request.headers,
                applicationId: appId,
            });

            try {
                const result = await {
                    GET: () => axios.get(application.targetUrl, { headers }),
                    POST: () =>
                        axios.post(application.targetUrl, body, { headers }),
                    PUT: () =>
                        axios.put(application.targetUrl, body, { headers }),
                    DELETE: () =>
                        axios.delete(application.targetUrl, { headers }),
                }[request.method]();
                await TargetResponse.create({
                    ...result,
                    hookEventId: hookEvent.id,
                });
                response.status(result.status).send(result.data);
            } catch (error) {
                await TargetResponse.create({
                    status: 500,
                    data: {},
                    headers: {},
                    hookEventId: hookEvent.id,
                });
                response.sendStatus(500);
            }
            await pubSub.publish(
                'NEW_HOOK_EVENT',
                JSON.stringify(hookEvent.toJSON()),
            );
        },
    );

    app.use(express.static(path.join(__dirname, '../../../web/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../../web/build', 'index.html'));
    });
    return { app, apolloServer, sequelize };
};
export { createApp };
