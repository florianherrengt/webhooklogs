import { Router } from "express";
import * as bodyParser from "body-parser";
import passport from "passport";
import { gitHubRouter } from "./github";

const passportRouter = Router();

passportRouter.use(passport.initialize());
passportRouter.use(bodyParser.urlencoded({ extended: true }));

passportRouter.use(gitHubRouter);

export { passportRouter };
