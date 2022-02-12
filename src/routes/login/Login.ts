import { Response, Request, NextFunction } from "express";
import { Warden } from "../../models/Warden";
import { Admin } from "../../models/Admin";
import { Student } from "../../models/Student";
import { createToken } from "../../service/jwt";

export async function Login(req: Request, res: Response, next: NextFunction): Promise<void>{
    const b = req.body;
    if(!b){
        res.status(400).send({
            error: true,
            message: "Send request body!"
        });
        return;
    }
    const email = b.email;
    const password = b.password;
    if(!email || !password){
        res.status(400).send({
            error: true,
            message: "Please make a valid request!"
        });
        return;
    }

    const student = await Student.findOne({ email: email });
    if(student){
        student.comparePassword(password, (err: Error, isMatch: boolean) => {
            if(err){
                res.status(400).send({
                    error: true,
                    message: "No user found with that email"
                });
                return;
            }
            if(isMatch){
                // create jwt token
                const token = createToken(student);
                student.jwtToken = token;
                res.status(200).send({
                    success: true,
                    jwt: token,
                    profile: student
                });
                return;
            }
            else{
                res.status(400).send({
                    error: true,
                    message: "No user found"
                });
                return;
            }
        });
    }
    const admin = await Admin.findOne({ email: email });
    if(admin){
        admin.comparePassword(password, (err: Error, isMatch: boolean) => {
            if(err){
                res.status(400).send({
                    error: true,
                    message: "No user found with that email"
                });
                return;
            }
            if(isMatch){
                // create jwt token
                const token = createToken(admin);
                admin.jwtToken = token;
                res.status(200).send({
                    success: true,
                    jwt: token,
                    profile: admin
                });
                return;
            }
            else{
                res.status(400).send({
                    error: true,
                    message: "No user found"
                });
                return;
            }
        });
    }
    const warden = await Warden.findOne({ email: email });
    if(warden){
        warden.comparePassword(password, (err: Error, isMatch: boolean) => {
            if(err){
                res.status(400).send({
                    error: true,
                    message: "No user found with that email"
                });
                return;
            }
            if(isMatch){
                // create jwt token
                const token = createToken(warden);
                warden.jwtToken = token;
                res.status(200).send({
                    success: true,
                    jwt: token,
                    profile: warden
                });
                return;
            }
            else{
                res.status(400).send({
                    error: true,
                    message: "No user found"
                });
                return;
            }
        });
    }
}