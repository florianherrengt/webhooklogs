import { Query, Resolver, InputType, Arg, Field, Mutation } from 'type-graphql';
import { Op } from 'sequelize';
import { Healthz } from '../../models/Healthz';

@Resolver()
export class HealthzResolver {
    @Query((returns) => Healthz)
    healthz() {
        return { ok: true };
    }
}
