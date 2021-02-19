import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UnauthorizedError,
} from 'type-graphql';
import { GraphqlContext } from '../graphqlContext';
import {
    Application,
    CreateApplicationInput,
    UpdateApplicationInput,
} from '../models';

@Resolver((of) => Application)
export class ApplicationResolver {
    @Query(() => Application)
    applicationById(@Arg('id') id: string) {
        return Application.findByPk(id);
    }
    @Query(() => [Application])
    applications(@Ctx() context: GraphqlContext) {
        return Application.findAll({
            where: {
                userId: context.user?.id,
            },
        });
    }
    @Mutation(() => Application)
    createApplication(
        @Arg('input') input: CreateApplicationInput,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        return Application.create({
            name: input.name.trim(),
            targetUrl: input.targetUrl,
            userId: context.user.id,
        });
    }
    @Mutation(() => Int)
    deleteApplicationById(
        @Arg('id') id: string,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        return Application.destroy({ where: { id }, cascade: true });
    }
    @Mutation(() => Application)
    async updateApplicationById(
        @Arg('input') input: UpdateApplicationInput,
        @Ctx() context: GraphqlContext,
    ) {
        const userId = context.user?.id;
        if (!userId) {
            return new UnauthorizedError();
        }
        await Application.update(input, {
            where: { id: input.id, userId },
        });
        return this.applicationById(input.id);
    }
    // maybe later... no time for this now.
    // @FieldResolver(() => [HookEvent])
    // hookEvents(@Root() application: Application): Promise<HookEvent[]> {
    //     return this.hookEventResolver.hookEvents({
    //         where: {
    //             applicationId: { eq: application.id },
    //         },
    //     });
    // }
}
