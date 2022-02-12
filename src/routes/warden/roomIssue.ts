import { Request, Response } from "express";
import { RoomIssue, RoomIssueDocument } from "../../models/RoomIssue";

/**
 * Create a new local account.
 * @route GET /warden/studentList
 */
export async function getRoomIssues (req: Request, res: Response): Promise<void> {
    if(req.body.id) {
        await RoomIssue.findById({ _id: req.body.id })
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else {
        await RoomIssue.find({})
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
}

export async function resolveRoomIssue (req: Request, res: Response): Promise<void> {
    if(req.body.id) {
        RoomIssue.findOneAndUpdate({ _id: req.body.id }, { $set: { status: "Resolved" } }, { new: true, useFindAndModify: false }, (err, doc) => {
            if (err) {
                res.status(500).send({ message: "Could not resolve room issue", err: err });
            } else {
                res.status(200).send({ message: "Resolved room issue!" });
            }
        });
    } else {
        res.status(404).send({ message: "No id received for resolving room issue."});
    }
}