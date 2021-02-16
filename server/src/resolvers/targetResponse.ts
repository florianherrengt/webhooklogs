import { Arg, Query, Resolver } from "type-graphql";
import { TargetResponse } from "../models";
import { User } from "../models/User";

@Resolver()
export class TargetResponseResolver {
    @Query((returns) => TargetResponse)
    targetResponseById(@Arg("id") id: string) {
        return TargetResponse.findByPk(id);
    }
}
