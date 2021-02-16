import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Application, HookEvent } from "../models";
import { User } from "../models/User";
import { HookEventResolver } from "./hookEvent";

@Resolver((of) => Application)
export class ApplicationResolver {
    private hookEventResolver: HookEventResolver;
    constructor(hookEventResolver?: HookEventResolver) {
        this.hookEventResolver = hookEventResolver || new HookEventResolver();
    }
    @Query(() => Application)
    applicationById(@Arg("id") id: string) {
        return Application.findByPk(id);
    }
    @FieldResolver(() => [HookEvent])
    hookEvents(@Root() application: Application): Promise<HookEvent[]> {
        return this.hookEventResolver.hookEvents({
            where: {
                applicationId: { eq: application.id },
            },
        });
    }
}
