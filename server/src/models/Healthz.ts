import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Healthz {
    @Field()
    ok: boolean;
}
