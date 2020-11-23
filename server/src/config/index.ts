import {
    HASURA_SECRET,
    HASURA_URL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} from "./envVar";

interface Config {
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
