// import { AdminDocument } from "../models/Admin";
// import { StudentDocument } from "../models/Student";
// import { WardenDocument } from "../models/Warden";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";

export function createToken(user: any): string{
    if(user.role === "student"){
        return jwt.sign({
            id: user.studentid,
            email: user.email,
            role: user.role,
            name: user.name,
            profile: user.profile
        }, JWT_SECRET);
    }
    if(user.role === "admin"){
        return jwt.sign({
            adminid: user.adminid,
            email: user.email,
            name: user.name,
            role: user.role
        }, JWT_SECRET);
    }
    if(user.role === "warden"){
        return jwt.sign({
            wardenid: user.wardenid,
            hostelid: user.hostelid,
            name: user.wardenname,
            email: user.email,
            role: user.role,
            profile: user.profile
        }, JWT_SECRET);
    }
}