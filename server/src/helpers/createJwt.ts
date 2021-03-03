import jwt from 'jsonwebtoken';
import { config } from '../config';

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
