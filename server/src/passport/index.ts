import passport from "passport";

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});
