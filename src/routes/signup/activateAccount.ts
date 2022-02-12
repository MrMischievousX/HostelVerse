import { Request, Response } from "express";
import { Student } from "../../models/Student";

export async function activateAccount(req: Request, res: Response) {
    const _b = req.body;
    const { email, code } = _b;
    if (!email || !code) {
        return res.json({
          error: true,
          status: 400,
          message: "Please make a valid request",
        });
    }
    const token = +code;
    const student = await Student.findOne({ 
        email: email,
        emailToken: token, // check if the code is expired
    });
    
    if(!student){
        return res.status(400).send({
            error: true,
            message: "Invalid Details!"
        });
    }
    if(student.emailTokenExpires < new Date()){
        return res.status(400).send({
            error: true,
            message: "Token Expired!"
        });
    }
    student.emailToken = null;
    student.emailTokenExpires = null;
    student.active = true;
    await student.save();

    return res.status(200).json({
        success: true,
        message: "Account activated.",
    });
}