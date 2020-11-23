import { HASURA_SECRET, HASURA_URL } from "./envVar";

interface Config {
    hasura: {
        url: string;
        secret: string;
    };
}

export const config: Config = {
    hasura: {
        url: HASURA_URL,
        secret: HASURA_SECRET,
    },
};
