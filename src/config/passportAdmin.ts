import { Request, Response, NextFunction } from "express";
import { NativeError } from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import { Admin, AdminDocument } from "../models/Admin";
import passportJwt from "passport-jwt";
import { JWT_SECRET } from "../util/secrets";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err: NativeError, user: AdminDocument) => done(err, user));
});


const passportAdminConfig = new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Admin.findOne({ email: email }, (err: NativeError, user: AdminDocument) => {
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

    passport.use("admin-local", passportAdminConfig);


const passJWTAdminConfig = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET 
}, (jwtPayload, done) => {
    Admin.findOne(jwtPayload._id, (err: NativeError, user: AdminDocument) => {
        if (err) { return done(err, false); }
        if (user) {
            return done(undefined, user);
        }
        return done(undefined, false);
    });
});

passport.use("admin-jwt", passJWTAdminConfig);