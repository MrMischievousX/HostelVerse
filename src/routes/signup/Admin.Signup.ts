import { Request, Response } from "express";
import { Admin } from "../../models/Admin";

export async function createAdmin(req: Request, res: Response){
    const b = req.body
    if(!b){
        res.status(400).send({
            error: true,
            message: "Send request body!"
        });
        return;
    }
    const email = b.email;
    const password = b.password;
    const adminid = b.adminid;
    const name = b.name;
    if(!email || !password || !adminid || !name){
        res.status(400).send({
            error: true,
            message: "Please make a valid request!"
        });
        return;
    }
    const admin = new Admin({
        email: email,
        password: password,
        adminid: adminid,
        name: name
    });
    admin.save((err: Error, admin: any) => {
        if(err){
            res.status(500).send({
                error: true,
                message: "Couldn't create admin"
            });
            return;
        }
        res.status(200).send({
            success: true,
            admin: admin
        });
    });
    
}