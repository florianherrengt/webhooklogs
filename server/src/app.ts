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
import { sequelize } from './models';
import { passportRouter } from './passport/router';
import { webhookRouter } from './webhook';
import { landingRouter } from './landing';

const createApp = async (): Promise<{
    app: express.Express;
    apolloServer: ApolloServer;
    sequelize: Sequelize;
    schema: GraphQLSchema;
}> => {
    await sequelize.sync();

    const app = express();

    app.get('/api/ping', (_, response) => response.send('pong'));
    app.use('/api', cors());
    app.use('/api', healhtzRouter);
    app.use('/api', configRouter);
    app.use('/api/auth', passportRouter);

    app.use('/api', bodyParser.json(), webhookRouter);
    const { apolloServer, graphqlRouter, schema } = await createGraphqlRouter();

    app.use('/api', graphqlRouter);

    app.use('/', landingRouter);
    app.use(anyRouter);
    return { app, apolloServer, sequelize, schema };
};
export { createApp };
