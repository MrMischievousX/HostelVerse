import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { StudentDocument } from "../../models/Student";

/**
 * Sign in using email and password.
 * @route POST /student/login
 */
export const StudentLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    passport.authenticate("student-jwt", (err: Error, user: StudentDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            // res.status(404).send("errors", {msg: info.message});
            res.status(404).send({ message: info.message });
            return;
        }
        req.logIn(user, (err) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return next(err); 
            }
            res.status(200).send(user);
        });
    })(req, res, next);
};