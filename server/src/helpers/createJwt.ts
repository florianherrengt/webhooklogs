import jwt from 'jsonwebtoken';
import express from 'express';
import { config } from '../config';
import { User } from '../models';
import { Op } from 'sequelize';

interface JwtPayload {
    userId: string;
}

const jwtOptions = {
    issuer: 'webhooklogs.com',
    audience: 'web',
};

export const createJwt = (payload: JwtPayload) =>
    jwt.sign(payload, config.app.jwt.secret, {
        expiresIn: '30 days',
        ...jwtOptions,
    });

export const verifyJwt = (token: string): JwtPayload =>
    jwt.verify(token, config.app.jwt.secret, {
        ...jwtOptions,
    }) as JwtPayload;

export const jwtMiddleware: express.Handler = async (
    request,
    _response,
    next,
) => {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    if (type === 'Bearer' && typeof token === 'string') {
        try {
            const jwtPayload = verifyJwt(token);
            request.user = { id: jwtPayload.userId };
        } catch (error) {}
    }
    if (request.headers['x-api-key']) {
        const user = await User.findOne({
            where: {
                apiKey: {
                    [Op.eq]: Buffer.from(
                        request.headers['x-api-key'].toString(),
                        'base64',
                    )
                        .toString('utf-8')
                        .trim(),
                },
            },
        });
        request.user = user ? { id: user.id } : undefined;
    }
    next();
};
