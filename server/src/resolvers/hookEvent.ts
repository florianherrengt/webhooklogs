import { Max, MaxLength } from 'class-validator';
import { Op, Order } from 'sequelize';
import {
    Arg,
    Args,
    ArgsType,
    Field,
    ObjectType,
    Query,
    Resolver,
    InputType,
    Int,
    Root,
    Subscription,
    Ctx,
    UnauthorizedError,
} from 'type-graphql';
import { GraphqlContext } from '../graphqlContext';
import {
    Application,
    HookEvent,
    HookEventAttributes,
    HookEventGraphqlAttributes,
    TargetResponse,
    TargetResponseAttributes,
    TargetResponseGraphqlAttributes,
} from '../models';
import { User } from '../models/User';
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
}

@InputType()
class PaginationCursorFields {
    @Field(() => String, { nullable: true })
    after?: string;
    @Field({ nullable: true, defaultValue: 20 })
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
    async hookEventById(@Arg('id') id: string) {
        const hookEvent = await HookEvent.findByPk(id, {
            include: [{ model: TargetResponse as any, as: 'targetResponse' }],
        });
        if (!hookEvent) {
            return new Error(`HookEvent not found for id ${id}`);
        }
        return this.formatHookEvent(hookEvent);
    }
    @Query(() => PaginatedHookEventResponse)
    async hookEvents(
        @Args() { where }: HookEventWhere,
        @Args() { cursor = { limit: 20 } }: PaginationCursor,
        @Ctx() context: GraphqlContext,
    ): Promise<PaginatedHookEventResponse | Error> {
        const applications = await Application.findAll({
            where: { userId: { eq: context.user?.id } },
        });
        const whereQuery = JSON.parse(JSON.stringify(where));
        const order: Order = [['createdAt', 'desc']];
        const limit = cursor.limit > 100 ? 100 : cursor.limit;

        const cursorRow = cursor?.after
            ? await HookEvent.findByPk(cursor.after)
            : null;
        if (cursor?.after && !cursorRow) {
            return new Error(
                `Could not find hook event with id ${cursor.after}`,
            );
        }
        const total = await HookEvent.count({
            where: whereQuery,
        });
        const items = await HookEvent.findAll({
            where: {
                [Op.and]: [
                    whereQuery,
                    cursorRow
                        ? {
                              id: { ne: cursorRow.id },
                              createdAt: {
                                  gt: cursorRow.createdAt,
                              },
                          }
                        : null,
                    { applicationId: { in: applications.map(({ id }) => id) } },
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
                    {
                        createdAt: {
                            gt: items[0].createdAt,
                        },
                    },
                    { id: { ne: items[0].id } },
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
        topics: 'NEW_HOOK_EVENT',
        filter: ({ payload, args }) =>
            args.applicationId === payload.applicationId,
        nullable: true,
    })
    async newHookEvent(
        @Root() hookEvent: HookEvent,
        @Args() args: NewHookEventArgs,
        @Ctx() context: GraphqlContext,
    ): Promise<HookEventGraphqlAttributes | Error | null> {
        console.log('NEW_HOOK_EVENT', { hookEvent, args, context });
        if (!hookEvent) return null;
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
        return this.hookEventById(hookEvent.id);
    }
}
