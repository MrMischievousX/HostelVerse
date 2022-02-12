import { Request, Response } from "express";
import { RoomIssue } from "../../models/RoomIssue";

export async function createRoomIssue(req: Request, res: Response): Promise<void> {
    if(!req.body){
        res.status(400).send({ message : "Body cannot be empty!"});
    }
    const roomissue = new RoomIssue();
    roomissue.hostelid = req.body.hostelid;
    roomissue.roomno = req.body.roomno;
    roomissue.remarks = req.body.remarks;

    roomissue.save()
        .then(data => {
            res.send("Room issue created successfully.");
        }).catch(err => res.status(500).send({ message: err.message || "An error occured while creating a room issue."}));
}