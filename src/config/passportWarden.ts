import { Request, Response, NextFunction } from "express";
import { NativeError } from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import { Warden, WardenDocument } from "../models/Warden";
import passportJwt from "passport-jwt";
import { JWT_SECRET } from "../util/secrets";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    Warden.findById(id, (err: NativeError, user: WardenDocument) => done(err, user));
});


const passportWardenConfig = new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Warden.findOne({ email: email }, (err: NativeError, user: WardenDocument) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
});

passport.use("warden-local", passportWardenConfig);

const passJWTWardenConfig = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET 
}, (jwtPayload, done) => {
    Warden.findById(jwtPayload._id, (err: NativeError, user: WardenDocument) => {
        if (err) { return done(err, false); }
        if (user) {
            return done(undefined, user);
        }
        return done(undefined, false);
    });
});

passport.use("student-jwt", passJWTWardenConfig);