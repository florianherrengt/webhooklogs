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

type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const isSupportedMethod = (method: string): method is SupportedMethod =>
    ['GET', 'POST', 'PUT', 'DELETE'].includes(method);

const createApp = async (): Promise<express.Express> => {
    const app = express();
    app.use(cors());
    await sequelize.sync();

    app.use((request, _response, next) => {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        if (type === 'Bearer' && typeof token === 'string') {
            const jwtPayload = verifyJwt(token);
            request.user = { id: jwtPayload.userId };
        }
        next();
    });
    const schema = await buildSchema({
        resolvers,
        pubSub,
    });
    const server = new ApolloServer({
        schema,
        context: createGraphqlContext,
    });

    server.applyMiddleware({ app });

    app.use('/auth', passportRouter);

    app.use('/webhook/:appId', bodyParser.json(), async (request, response) => {
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
        console.log(request.path);
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

        const result = await {
            GET: () => axios.get(application.targetUrl, { headers }),
            POST: () => axios.post(application.targetUrl, body, { headers }),
            PUT: () => axios.put(application.targetUrl, body, { headers }),
            DELETE: () => axios.delete(application.targetUrl, { headers }),
        }[request.method]();

        await TargetResponse.create({
            ...result,
            hookEventId: hookEvent.id,
        });
        response.status(result.status).send(result.data);
    });

    app.get('/healthz', (_, response) => {
        response.json({ ok: 1 });
    });
    return app;
};
export { createApp };
