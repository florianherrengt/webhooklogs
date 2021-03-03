import {
    HASURA_SECRET,
    HASURA_URL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_SECRET,
    PORT,
    DATABASE_URL,
    STRIPE_KEY,
    STRIPE_SECRET,
    STRIPE_PRICE_ID,
    DOMAIN,
    HTTPS,
    REDIS_URL,
    ADMIN_SECRET,
    SERVE_STATIC_FILES,
} from './envVar';

interface Config {
    app: {
        port: string;
        domain: string;
        protocol: 'https' | 'http';
        jwt: {
            secret: string;
        };
        admin: {
            secret: string;
        };
        serveStaticFiles: boolean;
    };
    database: {
        url: string;
    };
    redis: {
        url: string;
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
    stripe: {
        key: string;
        secret: string;
        priceId: string;
    };
}

export const config: Config = {
    app: {
        port: PORT,
        protocol: HTTPS ? 'https' : 'http',
        domain: DOMAIN,
        jwt: {
            secret: JWT_SECRET,
        },
        admin: {
            secret: ADMIN_SECRET,
        },
        serveStaticFiles: SERVE_STATIC_FILES,
    },
    database: {
        url: DATABASE_URL,
    },
    redis: {
        url: REDIS_URL,
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
    stripe: {
        key: STRIPE_KEY,
        secret: STRIPE_SECRET,
        priceId: STRIPE_PRICE_ID,
    },
};
