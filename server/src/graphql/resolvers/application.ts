import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UnauthorizedError,
} from 'type-graphql';
import { cache } from '../../cache';
import { GraphqlContext } from '../../graphqlContext';
import {
    Application,
    CreateApplicationInput,
    UpdateApplicationInput,
} from '../../models';

@Resolver((of) => Application)
export class ApplicationResolver {
    @Query(() => Application)
    async applicationById(
        @Arg('id') id: string,
        @Ctx() context: GraphqlContext,
    ) {
        const application =
            (await cache.application.get(id)) ||
            (await Application.findByPk(id));
        if (application) {
            await cache.application.set(application.id, application);
        }
        if (application?.userId !== context.user?.id) {
            return new UnauthorizedError();
        }
        return application;
    }
    @Query(() => [Application])
    async applications(@Ctx() context: GraphqlContext) {
        const applications = await Application.findAll({
            where: {
                userId: context.user?.id || null,
            },
        });
        return applications.map(({ id }) => this.applicationById(id, context));
    }
    @Mutation(() => Application)
    async createApplication(
        @Arg('input') input: CreateApplicationInput,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        const { id } = await Application.create({
            name: input.name.trim(),
            targetUrl: input.targetUrl,
            userId: context.user.id,
        });
        return this.applicationById(id, context);
    }
    @Mutation(() => Int)
    deleteApplicationById(
        @Arg('id') id: string,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        return Application.destroy({
            where: { id, userId: context.user.id },
            cascade: true,
        });
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
        return this.applicationById(input.id, context);
    }
}
