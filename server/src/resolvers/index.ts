import { BuildSchemaOptions } from "type-graphql";
import { HealthzResolver } from "./healthz";
import { UserResolver } from "./user";
import { ApplicationResolver } from "./application";

export const resolvers = [
    HealthzResolver,
    UserResolver,
    ApplicationResolver,
] as BuildSchemaOptions["resolvers"];
