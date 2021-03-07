process.env.HASURA_SECRET = 'HASURA_SECRET';
process.env.HASURA_URL = 'HASURA_URL';
process.env.GITHUB_CLIENT_ID = 'GITHUB_CLIENT_ID';
process.env.GITHUB_CLIENT_SECRET = 'GITHUB_CLIENT_SECRET';
process.env.JWT_SECRET = 'JWT_SECRET';
process.env.DATABASE_URL = 'postgres://localhost:5432/webhooklogstest';
process.env.STRIPE_KEY = 'STRIPE_KEY';
process.env.STRIPE_SECRET = 'STRIPE_SECRET';
process.env.STRIPE_PRICE_ID = 'STRIPE_PRICE_ID';
process.env.DOMAIN = 'DOMAIN';
process.env.REDIS_URL = 'redis://127.0.0.1';
process.env.ADMIN_SECRET = 'ADMIN_SECRET';
process.env.SERVE_STATIC_FILES = 'false';

import 'reflect-metadata';
import { sequelize } from './models';
import { redisClient } from './redis';
import { publisher, subscriber } from './pubSub';

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
    redisClient.quit();
    publisher.quit();
    subscriber.quit();
});
