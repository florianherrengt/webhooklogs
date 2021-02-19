import { InputType, Field } from 'type-graphql';

@InputType()
export class WhereOps {
    @Field((type) => String)
    eq: string;
}
