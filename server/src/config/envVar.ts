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
if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL env var required');
}
export const REDIS_URL = process.env.REDIS_URL;
export const HTTPS = process.env.HTTPS === 'true';

if (!process.env.ADMIN_SECRET) {
    throw new Error('ADMIN_SECRET env var required');
}
export const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!process.env.SERVE_STATIC_FILES) {
    throw new Error('SERVE_STATIC_FILES env var required');
}
export const SERVE_STATIC_FILES = process.env.SERVE_STATIC_FILES === 'true';

if (!process.env.MATRIX_TOKEN) {
    throw new Error('MATRIX_TOKEN env var required');
}
export const MATRIX_TOKEN = process.env.MATRIX_TOKEN;

if (!process.env.MATRIX_DOMAIN) {
    throw new Error('MATRIX_DOMAIN env var required');
}
export const MATRIX_DOMAIN = process.env.MATRIX_DOMAIN;

if (!process.env.MATRIX_ROOM_ID) {
    throw new Error('MATRIX_ROOM_ID env var required');
}
export const MATRIX_ROOM_ID = process.env.MATRIX_ROOM_ID;
