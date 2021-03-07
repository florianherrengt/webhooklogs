import redis from 'redis';
import { config } from './config';
import { redisClient } from './redis';
import { Application, ApplicationAttributes } from './models';

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
            const cacheKey = this.namespace ? `${this.namespace}:${key}` : key;
            redisClient.get(cacheKey, (error, data) => {
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
    set = (
        key: string,
        value: T,
        expire: number = 60 * 60 * 24,
    ): Promise<null> =>
        new Promise((resolve, reject) => {
            const cacheKey = this.namespace ? `${this.namespace}:${key}` : key;
            redisClient.set(
                cacheKey,
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
            const cacheKey = this.namespace ? `${this.namespace}:${key}` : key;
            redisClient.del(cacheKey, (error, reply) => {
                if (error) return reject(error);
                resolve(reply);
            });
        });
}

export class ApplicationCache {
    cache = new Cache({ namespace: 'application' });
    set(application: Application): Promise<null> {
        return this.cache.set(application.id, application.toJSON());
    }
    async get(id: string): Promise<Application | null> {
        const cached = await this.cache.get(id);
        if (!cached) {
            return null;
        }
        return Application.build(cached as any, { isNewRecord: false });
    }
    unset(application: Application) {
        return this.cache.unset(application.id);
    }
}

export const cache = {
    all: new Cache({ namespace: '' }),
    application: new ApplicationCache(),
};
