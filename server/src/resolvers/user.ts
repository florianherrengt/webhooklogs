import { Query, Resolver } from "type-graphql";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
    @Query((returns) => [User])
    me() {
        return User.findAll();
    }
}
