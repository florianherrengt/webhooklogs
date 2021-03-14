import { Max } from 'class-validator';
import { Op, Order, Sequelize } from 'sequelize';
import {
    Arg,
    Args,
    ArgsType,
    Ctx,
    Field,
    InputType,
    ObjectType,
    Query,
    Resolver,
    Root,
    Subscription,
    UnauthorizedError,
} from 'type-graphql';
import { GraphqlContext } from '../../graphqlContext';
import {
    Application,
    HookEvent,
    HookEventAttributes,
    HookEventGraphqlAttributes,
    TargetResponse,
    TargetResponseAttributes,
    TargetResponseGraphqlAttributes,
} from '../../models';
import { NEW_HOOK_EVENT, UPDATE_HOOK_EVENT } from '../../pubSub';
import { ApplicationResolver } from './application';
import PaginatedResponse from './PaginatedResponse';
import { WhereOps } from './WhereOps';

@InputType()
class HookEventWhereFields {
    @Field((type) => WhereOps, { nullable: true })
    applicationId: WhereOps;
}

@ArgsType()
class HookEventWhere {
    @Field(() => HookEventWhereFields)
    where: HookEventWhereFields;
    @Field(() => String, { nullable: true })
    searchTerms?: string;
}

@InputType()
class PaginationCursorFields {
    @Field(() => String, { nullable: true })
    after?: string;
    @Field({ nullable: true, defaultValue: 100 })
    @Max(100)
    limit: number;
}

@ArgsType()
class PaginationCursor {
    @Field(() => PaginationCursorFields, { nullable: true })
    cursor?: PaginationCursorFields;
}

@ObjectType()
class PaginatedHookEventResponse extends PaginatedResponse(HookEvent) {}

@ArgsType()
class NewHookEventArgs {
    @Field(() => String)
    applicationId: string;
}

@Resolver()
export class HookEventResolver {
    applicationResolver = new ApplicationResolver();
    formatHookEvent(hookEvent: HookEvent): HookEventGraphqlAttributes {
        const targetResponse: TargetResponseGraphqlAttributes | null = hookEvent.targetResponse
            ? {
                  ...(hookEvent.targetResponse.toJSON() as TargetResponseAttributes),
                  data: JSON.stringify(hookEvent.targetResponse.data),
                  headers: JSON.stringify(hookEvent.targetResponse.headers),
              }
            : null;
        return {
            ...(hookEvent.toJSON() as HookEventAttributes),
            body: JSON.stringify(hookEvent.body),
            headers: JSON.stringify(hookEvent.headers),
            targetResponse,
        };
    }
    @Query(() => HookEvent)
    async hookEventById(@Arg('id') id: string, @Ctx() context: GraphqlContext) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        const hookEvent = await HookEvent.findByPk(id, {
            include: [{ model: TargetResponse as any, as: 'targetResponse' }],
        });
        if (!hookEvent) {
            return new Error(`HookEvent not found for id ${id}`);
        }
        const application = await this.applicationResolver.applicationById(
            hookEvent.applicationId,
            context,
        );
        if (!application) {
            return new Error(`no application not found for id ${hookEvent.id}`);
        }
        if (application instanceof Error) {
            return application;
        }
        if (application.userId !== context.user.id) {
            return new UnauthorizedError();
        }
        return this.formatHookEvent(hookEvent);
    }
    @Query(() => PaginatedHookEventResponse)
    async hookEvents(
        @Args() { where, searchTerms }: HookEventWhere,
        @Args() { cursor = { limit: 100 } }: PaginationCursor,
        @Ctx() context: GraphqlContext,
    ): Promise<PaginatedHookEventResponse | Error> {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        const application = await this.applicationResolver.applicationById(
            where.applicationId.eq,
            context,
        );

        if (!application) {
            return new Error(
                `no application not found for id ${where.applicationId.eq}`,
            );
        }
        if (application instanceof Error) {
            return application;
        }
        if (application.userId !== context.user.id) {
            return new UnauthorizedError();
        }
        const order: Order = [['createdAt', 'desc']];
        const limit = cursor.limit >= 100 ? 100 : cursor.limit;

        const cursorRow = cursor?.after
            ? await HookEvent.findByPk(cursor.after)
            : null;
        if (cursor?.after && !cursorRow) {
            return new Error(
                `Could not find hook event with id ${cursor.after}`,
            );
        }

        const opLikeList = (searchTerms || '').split(' ').map((term) => ({
            [Op.like]: `%${term}%`,
        }));

        const searchTermsWhere = searchTerms
            ? {
                  [Op.or]: {
                      method: {
                          [Op.in]: searchTerms
                              .split(' ')
                              .map((t) => t.toUpperCase()),
                      },
                      headers: Sequelize.where(
                          Sequelize.cast(
                              Sequelize.col('HookEvent.headers'),
                              'varchar',
                          ),
                          {
                              [Op.or]: opLikeList,
                          },
                      ),
                      path: {
                          [Op.or]: opLikeList,
                      },
                      body: Sequelize.where(
                          Sequelize.cast(Sequelize.col('body'), 'varchar'),
                          {
                              [Op.or]: opLikeList,
                          },
                      ),
                  },
              }
            : null;

        const total = await HookEvent.count({
            where: {
                [Op.and]: [
                    {
                        applicationId: {
                            [Op.eq]: where.applicationId.eq,
                        },
                    },
                    searchTermsWhere,
                ],
            },
        });

        const items = await HookEvent.findAll({
            where: {
                [Op.and]: [
                    { applicationId: { [Op.eq]: where.applicationId.eq } },
                    searchTermsWhere,
                    cursorRow
                        ? {
                              id: { ne: cursorRow.id },
                              createdAt: {
                                  lt: cursorRow.createdAt,
                              },
                          }
                        : null,
                ],
            },
            include: [{ model: TargetResponse as any, as: 'targetResponse' }],
            order,
            limit,
        });

        if (!items.length) {
            return {
                items,
                hasMore: false,
                total,
            };
        }

        const hasMore = await HookEvent.count({
            where: {
                [Op.and]: [
                    { applicationId: { [Op.eq]: where.applicationId.eq } },
                    searchTermsWhere,
                    {
                        createdAt: {
                            lt: items[items.length - 1].createdAt,
                        },
                    },
                    { id: { ne: items[items.length - 1].id } },
                ],
            },
        });

        const mappedItems: HookEventGraphqlAttributes[] = items.map(
            this.formatHookEvent,
        );
        return {
            items: mappedItems as any,
            hasMore: !!hasMore,
            total,
        };
    }
    @Subscription(() => HookEvent, {
        topics: NEW_HOOK_EVENT,
        filter: ({ payload, args }) => {
            try {
                return args.applicationId === JSON.parse(payload).applicationId;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        nullable: true,
    })
    async newHookEvent(
        @Root() hookEventString: string,
        @Args() args: NewHookEventArgs,
        @Ctx() context: GraphqlContext,
    ): Promise<HookEventGraphqlAttributes | Error | null> {
        if (!hookEventString) return null;
        const hookEvent: HookEventAttributes = JSON.parse(hookEventString);
        const applications = await Application.findAll({
            where: { userId: { [Op.eq]: context.user?.id } },
        });

        if (
            !applications
                .map((application) => application.id)
                .includes(args.applicationId)
        ) {
            return new UnauthorizedError();
        }
        return this.hookEventById(hookEvent.id, context);
    }
    @Subscription(() => HookEvent, {
        topics: UPDATE_HOOK_EVENT,
        filter: ({ payload, args }) => {
            try {
                return args.applicationId === JSON.parse(payload).applicationId;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        nullable: true,
    })
    async updateHookEvent(
        @Root() hookEventString: string,
        @Args() args: NewHookEventArgs,
        @Ctx() context: GraphqlContext,
    ): Promise<HookEventGraphqlAttributes | Error | null> {
        return this.newHookEvent(hookEventString, args, context);
    }
}
