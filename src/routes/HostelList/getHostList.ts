import { Request, Response } from "express";
import { Feedback } from "../../models/Feedback";
import { Hostel } from "../../models/Hostel";

export async function getHostelList(req: Request, res: Response): Promise<void> {
    const hostelList = await Hostel.find({}, null, { sort: { hostelid: 1 } }).select("hostelid hostelname location totalrooms roomsleft fees wardenid ");
   res.send(hostelList);
}

export async function getHostel(req: Request, res: Response){
    try{
        const b = req.body;
        if(!b.hostelid){
            res.status(400).send({ message : "Hostelid cannot be empty!"});
            return;
        }
    
        const hostel = await Hostel.findOne({ hostelid: b.hostelid }).select(" hostelname image numberOfReviews overallRating");
        if(!hostel){
            res.status(404).send("Hostel not found!");
        }
        const feedbackList = Feedback.find({ hostelid: b.hostelid }).select("studentid name rating message");
        res.send({ 
            hostel: hostel,
            feedbackList: feedbackList
         });
    }
    catch{
        res.status(500).send("Error occured!");
    }
}