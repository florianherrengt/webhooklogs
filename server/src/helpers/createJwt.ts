import jwt from "jsonwebtoken";
import { config } from "../config";

interface JwtPayload {
    userId: string;
}

export const createJwt = (payload: JwtPayload) =>
    jwt.sign(payload, config.app.jwt.secret, {
        expiresIn: "30 days",
        issuer: "hookhub.com",
        audience: "web",
    });
