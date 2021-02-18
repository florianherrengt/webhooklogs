import { Ctx, Query, Resolver } from 'type-graphql';
import { GraphqlContext } from '../graphqlContext';
import { User } from '../models/User';

@Resolver()
export class UserResolver {
    @Query((returns) => User, { nullable: true })
    me(@Ctx() context: GraphqlContext) {
        return User.findByPk(context.user?.id);
    }
}
