import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { config } from "../config";

passport.use(
    new GitHubStrategy(
        {
            clientID: config.passport.github.clientId,
            clientSecret: config.passport.github.clientSecret,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        function (
            accessToken: string,
            refreshToken: string,
            profile: string,
            done: Function,
        ) {
            console.log(
                JSON.stringify({ accessToken, refreshToken, profile }, null, 2),
            );
            done();
        },
    ),
);
