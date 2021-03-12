import { Op } from 'sequelize';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { verifyJwt } from './helpers/createJwt';
import { User } from './models';

export interface GraphqlContext {
    user?: {
        id: string;
    };
}

export const createGraphqlContext = async (
    params: { req?: Express.Request; connection?: ExecutionParams } = {},
): Promise<GraphqlContext> => {
    const [type, token] =
        params.connection?.context.authorization?.split(' ') || [];
    if (type === 'Bearer' && typeof token === 'string') {
        const jwtPayload = verifyJwt(token);
        return { user: { id: jwtPayload.userId } };
    }
    if (params.connection?.context['x-api-key']) {
        const existingUser = await User.findOne({
            where: {
                apiKey: {
                    [Op.eq]: Buffer.from(
                        params.connection?.context['x-api-key'].toString(),
                        'base64',
                    )
                        .toString('utf-8')
                        .trim(),
                },
            },
        });
        if (existingUser) {
            return { user: { id: existingUser.id } };
        }
    }
    const { user } = params.req || {};
    return {
        user,
    };
};
