import { Op } from 'sequelize';
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
    ApplicationAttributes,
    CreateApplicationInput,
    UpdateApplicationInput,
} from '../../models';

@Resolver((of) => Application)
export class ApplicationResolver {
    checkError(application: Application | Error): application is Application {
        return application instanceof Error;
    }
    @Query(() => Application)
    async applicationById(
        @Arg('id') id: string,
        @Ctx() context: GraphqlContext,
    ): Promise<Application | Error | null> {
        const application =
            (await cache.application.get(id)) ||
            (await Application.findByPk(id));
        if (application) {
            await cache.application.set(application);
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
    @Mutation(() => Application)
    async updateApplicationById(
        @Arg('input') input: UpdateApplicationInput,
        @Ctx() context: GraphqlContext,
    ) {
        const userId = context.user?.id;
        if (!userId) {
            return new UnauthorizedError();
        }
        if (!input.id) {
            return new Error('id is required');
        }
        const application = await this.applicationById(input.id, context);
        if (!application) {
            return new Error(`application with id: ${input.id} not found`);
        }
        if (application instanceof Error) {
            return application;
        }
        application.name = input.name || application.name;
        await application.save();
        return this.applicationById(application.id, context);
    }
    @Mutation(() => Int)
    async deleteApplicationById(
        @Arg('id') id: string,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        const application = await this.applicationById(id, context);
        if (!application) {
            return new Error(`application with id: ${id} not found`);
        }
        if (application instanceof Error) {
            return application;
        }
        await application.destroy();
        return true;
    }
}
