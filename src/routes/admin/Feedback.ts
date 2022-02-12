import { Request, Response } from "express";
import { Feedback } from "../../models/Feedback";

export async function viewFeedback(req: Request, res: Response): Promise<void>{

    if(!req.body.id){
        const feedbacks = await Feedback.find();
        res.send(feedbacks);
    }
    else{
        const feedback = await Feedback.findById(req.body.id);
        res.send(feedback);
    }
}