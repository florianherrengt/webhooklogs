import { ApolloServerExpressConfig, ApolloServer } from 'apollo-server-express';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { verifyJwt } from './helpers/createJwt';

export interface GraphqlContext {
    user?: {
        id: string;
    };
}

export const createGraphqlContext = (
    params: { req?: Express.Request; connection?: ExecutionParams } = {},
): GraphqlContext => {
    const [type, token] =
        params.connection?.context.authorization?.split(' ') || [];
    if (type === 'Bearer' && typeof token === 'string') {
        const jwtPayload = verifyJwt(token);
        return { user: { id: jwtPayload.userId } };
    }
    const { user } = params.req || {};
    return {
        user,
    };
};
