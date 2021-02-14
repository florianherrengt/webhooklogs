import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { config } from "../config";
import { User } from "../models";

passport.use(
    new GitHubStrategy(
        {
            clientID: config.passport.github.clientId,
            clientSecret: config.passport.github.clientSecret,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async function (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: Function,
        ) {
            const user = await User.create({
                email: profile.emails?.length
                    ? profile.emails[0].value
                    : undefined,
                githubId: profile.id,
            });

            done(null, user);
        },
    ),
);
