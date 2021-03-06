import redis from 'redis';
import { config } from './config';
import { redisClient } from './redis';
import { ApplicationAttributes } from './models';

redisClient.on('error', function (error) {
    console.error(error);
});

export class Cache<T> {
    namespace: string = '';
    constructor(params: { namespace: string }) {
        this.namespace = params.namespace;
    }
    get = (key: string): Promise<T | null> =>
        new Promise((resolve, reject) => {
            redisClient.get(`${this.namespace}:${key}`, (error, data) => {
                if (error) return reject(error);
                if (!data) {
                    return resolve((data as any) as T);
                }
                try {
                    return resolve(JSON.parse(data));
                } catch (e) {
                    return resolve((data as any) as T);
                }
            });
        });
    set = (key: string, value: T, expire: number = 60 * 60 * 24) =>
        new Promise((resolve, reject) => {
            redisClient.set(
                `${this.namespace}:${key}`,
                typeof value !== 'string' ? JSON.stringify(value) : value,
                'EX',
                expire,
                (error) => {
                    if (error) return reject(error);
                    resolve(null);
                },
            );
        });
    unset = (key: string) =>
        new Promise((resolve, reject) => {
            redisClient.del(`${this.namespace}:${key}`, (error, reply) => {
                if (error) return reject(error);
                resolve(reply);
            });
        });
}

export class ApplicationCache extends Cache<ApplicationAttributes> {}

export const cache = {
    application: new ApplicationCache({ namespace: 'application' }),
};
