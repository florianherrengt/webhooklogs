import { GraphQLClient } from 'graphql-request';
import { config } from '../config';
import { getSdk } from './api';

const graphqlClient = new GraphQLClient(config.hasura.url, {
    headers: {
        'x-hasura-admin-secret': config.hasura.secret,
    },
});

export const sdk = getSdk(graphqlClient);
export * from './api';
export * from './matrix';
