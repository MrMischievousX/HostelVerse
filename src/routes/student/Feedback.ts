import { Request, Response } from "express";
import { Feedback } from "../../models/Feedback";
import { Hostel } from "../../models/Hostel";
import { Room } from "../../models/Room";

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

    const hostelid = ((await Room.findOne({ studentid: req.body.studentid })).hostelid)
    const hostel = await Hostel.findOne({ hostelid: hostelid });    
    let numOfReviews = hostel.numberOfReviews;
    let overallRating = hostel.overallRating;
    let totalScore = numOfReviews * overallRating;
    let newScore = (totalScore + req.body.rating) / (numOfReviews + 1);
    hostel.overallRating = newScore;
    hostel.numberOfReviews = numOfReviews + 1;
    hostel.save()
    
}