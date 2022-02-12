import { Request, Response } from "express";
import { Warden } from "../../models/Warden";

export async function WardenProfile(req: Request, res: Response): Promise<void> {
    if(!req.body.email){
        res.status(400).send({ message : "Email cannot be empty!"});
        return;
    }
    Warden.findOne({ email: req.body.email })
    .then(data => { res.send(data); })
    .catch(err => { res.send(404).send("Warden not found with that email!");});
}