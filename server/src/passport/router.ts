import { Router } from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";

const passportRouter = Router();

passportRouter.use(passport.initialize());
passportRouter.use(bodyParser.urlencoded({ extended: true }));

passportRouter.get("/github", passport.authenticate("github"));

passportRouter.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth" }),
    function (req, res) {
        res.redirect("/");
    },
);

export { passportRouter };
