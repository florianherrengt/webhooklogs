import { ApolloServer } from 'apollo-server-express';
import { Router } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createGraphqlContext } from '../graphqlContext';
import { jwtMiddleware } from '../helpers/createJwt';
import { resolvers } from './resolvers';
import { pubSub } from '../pubSub';

export const createGraphqlRouter = async () => {
    const graphqlRouter = Router();
    const schema = await buildSchema({
        resolvers,
        pubSub,
    });
    const apolloServer = new ApolloServer({
        schema,
        subscriptions: { path: '/api/graphql' },
        context: createGraphqlContext,
    });
    graphqlRouter.use(
        '/graphql',
        jwtMiddleware,
        apolloServer.getMiddleware({ path: '/' }),
    );
    return { graphqlRouter, apolloServer, schema };
};
