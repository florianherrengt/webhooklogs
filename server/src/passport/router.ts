import { Router } from "express";
import * as bodyParser from "body-parser";
import passport from "passport";

const passportRouter = Router();

passportRouter.use(passport.initialize());
passportRouter.use(bodyParser.urlencoded({ extended: true }));

passportRouter.get(
    "/github",
    passport.authenticate("github", { scope: "user:email" }),
);

passportRouter.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth" }),
    function (req, res) {
        res.redirect("/");
    },
);

export { passportRouter };
