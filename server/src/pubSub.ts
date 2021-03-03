import { RedisPubSub } from 'graphql-redis-subscriptions';
import redis from 'redis';
import { config } from './config';

export const publisher = redis.createClient(config.redis.url);
export const subscriber = redis.createClient(config.redis.url);

export const pubSub = new RedisPubSub({
    publisher,
    subscriber,
});
