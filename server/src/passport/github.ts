import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { Op } from 'sequelize';
import { config } from '../config';
import { createJwt } from '../helpers/createJwt';
import { User, UserAttributes } from '../models';
import { createUser } from './createUser';

passport.use(
    new GitHubStrategy(
        {
            clientID: config.passport.github.clientId,
            clientSecret: config.passport.github.clientSecret,
            callbackURL: 'http://localhost:3000/auth/github/callback',
        },
        async function (
            _accessToken: string,
            _refreshToken: string,
            profile: Profile,
            done: (
                error: Error | null,
                user: express.Request['user'] | null,
            ) => void,
        ) {
            try {
                const existingUser = await User.findOne({
                    where: { githubId: { [Op.eq]: profile.id } },
                });
                if (existingUser) {
                    return done(null, existingUser.toJSON() as UserAttributes);
                }
                const email = profile.emails?.length
                    ? profile.emails[0].value
                    : undefined;
                const user = await createUser({
                    username:
                        profile.username ||
                        profile.displayName ||
                        email?.split('@')[0] ||
                        'anonymous',
                    email,
                    githubId: profile.id,
                });

                done(null, user.toJSON() as UserAttributes);
            } catch (error) {
                done(error, null);
            }
        },
    ),
);

const gitHubRouter = express.Router();

gitHubRouter.get(
    '/github',
    passport.authenticate('github', { scope: 'user:email', session: false }),
);

gitHubRouter.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth',
        session: false,
    }),
    function (req, res) {
        if (!req.user) {
            return res.status(500).json({ error: 'req.user is undefined' });
        }
        res.json({ token: createJwt({ userId: req.user.id }) });
    },
);

export { gitHubRouter };
