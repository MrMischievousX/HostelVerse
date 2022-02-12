import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";

export async function verifyWarden(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, JWT_SECRET, (err, payload: JwtPayload) => {
            if(err){
                return res.status(403);
            }
            if(payload.role === "warden"){
                next();
            }
            else{
                res.send(401);
            }
        });
    }
    else{
        res.status(401);
    }
}