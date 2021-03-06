import { Arg, ArgsType, Field, Query, Resolver } from 'type-graphql';
import { TargetResponse, TargetResponseGraphqlAttributes } from '../../models';

@ArgsType()
class NewTargetResponseArgs {
    @Field(() => String)
    applicationId: string;
}

@Resolver()
export class TargetResponseResolver {
    @Query((returns) => TargetResponse, { nullable: true })
    async targetResponseById(
        @Arg('id') id: string,
    ): Promise<TargetResponseGraphqlAttributes | null> {
        const targetResponse = await TargetResponse.findByPk(id);
        if (!targetResponse) {
            return null;
        }
        return {
            ...targetResponse,
            data: JSON.stringify(targetResponse.data),
            headers: JSON.stringify(targetResponse.headers),
        };
    }
}
