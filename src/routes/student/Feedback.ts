import { Request, Response } from "express";
import { Feedback } from "../../models/Feedback";

export async function createFeedback(req: Request, res: Response): Promise<void>{
    if(!req.body){
        res.status(400).send({ message : "Body cannot be empty!"});
        return;
    }
    const feedback = new Feedback();
    feedback.studentid = req.body.studentid;
    feedback.name = req.body.name;
    feedback.rating = req.body.rating;
    feedback.message = req.body.message;
    feedback.save()
    .then(feedback => {
        res.send("Successfully created Feedback!");
    })
    .catch(err => {
        res.status(400).send("Unable to create Feedback!");
    });
}