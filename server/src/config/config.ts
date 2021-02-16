import {
    HASURA_SECRET,
    HASURA_URL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_SECRET,
    PORT,
} from "./envVar";

interface Config {
    app: {
        port: string;
        jwt: {
            secret: string;
        };
    };
    hasura: {
        url: string;
        secret: string;
    };
    passport: {
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
}

export const config: Config = {
    app: {
        port: PORT,
        jwt: {
            secret: JWT_SECRET,
        },
    },
    hasura: {
        url: HASURA_URL,
        secret: HASURA_SECRET,
    },
    passport: {
        github: {
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        },
    },
};
