export const HASURA_SECRET = process.env.HASURA_SECRET || '';
export const HASURA_URL = process.env.HASURA_URL || '';
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET env var required');
}
export const JWT_SECRET = process.env.JWT_SECRET;
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env var required');
}
export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || '3000';
if (!process.env.STRIPE_KEY) {
    throw new Error('STRIPE_KEY env var required');
}
export const STRIPE_KEY = process.env.STRIPE_KEY;
if (!process.env.STRIPE_SECRET) {
    throw new Error('STRIPE_SECRET env var required');
}
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
if (!process.env.STRIPE_PRICE_ID) {
    throw new Error('STRIPE_PRICE_ID env var required');
}
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
if (!process.env.DOMAIN) {
    throw new Error('DOMAIN env var required');
}
export const DOMAIN = process.env.DOMAIN;
export const HTTPS = process.env.HTTPS === 'true';
