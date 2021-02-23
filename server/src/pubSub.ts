// import { PubSub } from 'graphql-subscriptions';
// export const pubSub = new PubSub();

import { NatsPubSub } from '@moonwalker/graphql-nats-subscriptions';

export const pubSub = new NatsPubSub(); // default connecting to nats://localhost:4222
