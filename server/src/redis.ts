import redis from 'redis';
import { config } from './config';
export const redisClient = redis.createClient(config.redis.url);

redisClient.on('error', function (error) {
    console.error(error);
});
