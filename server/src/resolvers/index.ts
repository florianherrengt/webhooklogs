import { BuildSchemaOptions } from 'type-graphql';
import { HealthzResolver } from './healthz';
import { UserResolver } from './user';
import { ApplicationResolver } from './application';
import { HookEventResolver } from './hookEvent';

export const resolvers = [
    HealthzResolver,
    UserResolver,
    ApplicationResolver,
    HookEventResolver,
] as BuildSchemaOptions['resolvers'];
