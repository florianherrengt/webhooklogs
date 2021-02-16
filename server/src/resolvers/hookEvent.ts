import { Arg, Args, ArgsType, Field, Query, Resolver } from "type-graphql";
import { HookEvent } from "../models";
import { User } from "../models/User";

@ArgsType()
class WhereOps {
    @Field((type) => String)
    eq: string;
}

@ArgsType()
class WhereFields {
    @Field((type) => WhereOps, { nullable: true })
    applicationId: WhereOps;
}

@ArgsType()
class Where {
    @Field((type) => WhereFields)
    where: WhereFields;
}

@Resolver()
export class HookEventResolver {
    @Query(() => HookEvent)
    hookEventById(@Arg("id") id: string) {
        return HookEvent.findByPk(id);
    }
    hookEvents(@Args() { where }: Where) {
        return HookEvent.findAll();
    }
}
