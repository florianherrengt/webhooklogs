import { gql } from "apollo-server-express";
// import { IncomingEvent } from "../models";

const Query = gql`
    type Healthz {
        ok: Int!
    }
    # type IncomingEvents {}
    type Query {
        healthz: Healthz
    }
`;

export const typeDefs = [Query];
