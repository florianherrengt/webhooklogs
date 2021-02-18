import { Router } from 'express';
import * as bodyParser from 'body-parser';
import passport from 'passport';
import { gitHubRouter } from './github';
import { verifyJwt } from '../helpers/createJwt';

const passportRouter = Router();

passportRouter.use(passport.initialize());
passportRouter.use(bodyParser.urlencoded({ extended: true }));

passportRouter.use(gitHubRouter);

passportRouter.get('/me', (request, response) => {
    try {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        if (type === 'Bearer' && typeof token === 'string') {
            return response.json(verifyJwt(token));
        }
        return response.sendStatus(404);
    } catch (error) {
        response.status(500).json(error);
    }
});

export { passportRouter };
