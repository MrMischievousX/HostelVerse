import { Request, Response } from "express";
import { Warden, WardenDocument } from "../../models/Warden";

export async function viewWarden(req: Request, res: Response): Promise<void>{

    let feedback: WardenDocument | WardenDocument[];
    if(!req.body.id){
        feedback = await Warden.find();
    }
    else{
        feedback = await Warden.findById(req.body.id);
    }
    res.send(feedback);
}