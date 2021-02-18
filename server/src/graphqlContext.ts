import { ApolloServerExpressConfig } from "apollo-server-express";

export interface GraphqlContext {
    user?: {
        id: string;
    };
}

export const createGraphqlContext: ApolloServerExpressConfig["context"] = ({
    req,
}): GraphqlContext => {
    const { user } = req;
    return {
        user,
    };
};
