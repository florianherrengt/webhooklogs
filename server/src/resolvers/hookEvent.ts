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
} from 'type-graphql';
import { HookEvent, HookEventAttributes } from '../models';
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

@Resolver()
export class HookEventResolver {
    @Query(() => HookEvent)
    hookEventById(@Arg('id') id: string) {
        return HookEvent.findByPk(id);
    }
    @Query(() => PaginatedHookEventResponse)
    async hookEvents(
        @Args() { where }: HookEventWhere,
        @Args() { cursor = { limit: 20 } }: PaginationCursor,
    ): Promise<PaginatedHookEventResponse | Error> {
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
                ],
            },
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
        return {
            items,
            hasMore: !!hasMore,
            total,
        };
    }
}
