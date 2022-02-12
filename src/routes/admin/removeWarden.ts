import { Request, Response } from "express";
import { Warden } from "../../models/Warden";

export async function removeWarden(req: Request, res: Response){
    const b = req.body;
    if(!b){
        res.status(400).send({
            error: true,
            message: "Send request body!"
        });
        return;
    }
    const wardenid = b.wardenid;
    if(!wardenid){
        res.status(400).send({
            error: true,
            message: "Please make a valid request!"
        });
        return;
    }
    Warden.deleteOne({wardenid: wardenid})
    .then(() => {
        res.status(200).send({
            success: true,
            message: "Warden deleted successfully!"
        });
    })
    .catch((err: Error) => {
        res.status(500).send({
            error: true,
            message: "Couldn't delete Warden"
        });
    });
}