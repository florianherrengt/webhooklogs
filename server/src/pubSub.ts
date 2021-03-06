import { RedisPubSub } from 'graphql-redis-subscriptions';
import redis from 'redis';
import { config } from './config';
import { HookEventAttributes, TargetResponseAttributes } from './models';

export const publisher = redis.createClient(config.redis.url);
export const subscriber = redis.createClient(config.redis.url);

export const pubSub = new RedisPubSub({
    publisher,
    subscriber,
});

export const NEW_HOOK_EVENT = 'NEW_HOOK_EVENT';
export const UPDATE_HOOK_EVENT = 'UPDATE_HOOK_EVENT';
export const NEW_TARGET_RESPONSE = 'NEW_TARGET_RESPONSE';

export const publish = {
    newHookEvent: (hookEvent: HookEventAttributes) =>
        pubSub.publish(NEW_HOOK_EVENT, JSON.stringify(hookEvent)),
    updateHookEvent: (hookEvent: HookEventAttributes) =>
        pubSub.publish(UPDATE_HOOK_EVENT, JSON.stringify(hookEvent)),
};
