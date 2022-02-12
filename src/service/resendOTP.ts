import { Request, Response } from "express";
import { sendOTPEmail } from "./mailer";
import { createOTP } from "../util/createOTP";

export async function resendOTP(req: Request, res: Response){
    const b = req.body;
    if(!b){
        res.status(400).send({
            error: true,
            message: "Send request body!"
        });
        return;
    }
    const email = b.email;
    if(!email){
        res.status(400).send({
            error: true,
            message: "Please make a valid request!"
        });
        return;
    }
    const code = createOTP();
    const sendMail = await sendOTPEmail(email, code);
    if(sendMail.error){
        res.status(500).send({
            error: true,
            message: "Couldn't send verification email."
        });
        return;
    }   
    res.status(200).send({
        success: true,
        message: "OTP sent successfully!"
    });
}