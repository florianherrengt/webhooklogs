export const HASURA_SECRET = process.env.HASURA_SECRET || "";
export const HASURA_URL = process.env.HASURA_URL || "";
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env var required");
}
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || "3000";
