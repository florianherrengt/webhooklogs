import express from "express";
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

const gitHubRouter = express.Router();

gitHubRouter.get(
    "/github",
    passport.authenticate("github", { scope: "user:email", session: false }),
);

gitHubRouter.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth",
        session: false,
    }),
    function (req, res) {
        res.json({ token: "fake token" });
    },
);

export { gitHubRouter };
