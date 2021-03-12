import 'reflect-metadata';
import './passport';
import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { Sequelize } from 'sequelize/types';
import { anyRouter } from './any';
import { configRouter } from './config';
import { createGraphqlRouter } from './graphql';
import { healhtzRouter } from './healthz';
import { passportRouter } from './passport/router';
import { webhookRouter } from './webhook';
import { landingRouter } from './landing';
import { contactUsRouter } from './contact-us';

const createApp = async (): Promise<{
    app: express.Express;
    apolloServer: ApolloServer;
    schema: GraphQLSchema;
}> => {
    const app = express();
    app.enable('trust proxy');

    app.get('/api/ping', (_, response) => response.send('pong'));
    app.use('/api', contactUsRouter);
    app.use('/api', cors());
    app.use('/api', healhtzRouter);
    app.use('/api', configRouter);
    app.use('/api/auth', passportRouter);

    app.use('/api', bodyParser.json(), webhookRouter);
    const { apolloServer, graphqlRouter, schema } = await createGraphqlRouter();

    app.use('/api', graphqlRouter);

    app.use('/', landingRouter);
    app.use(anyRouter);
    return { app, apolloServer, schema };
};
export { createApp };
