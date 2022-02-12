import { Request, Response } from "express";
import { LeaveApplication, LeaveApplicationDocument } from "../../models/LeaveApplication";

/**
 * Create a new local account.
 * @route GET /warden/studentList
 */
export async function getLeaveApplications (req: Request, res: Response): Promise<void> {
    await LeaveApplication.find({})
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

}

export async function acceptLeaveApplication (req: Request, res: Response): Promise<void> {
    if(req.body.id && req.body.status) {
        LeaveApplication.findOneAndUpdate({ _id: req.body.id }, { $set: { status: req.body.status } }, { new: true, useFindAndModify: false }, (err, doc) => {
            if (err) {
                res.status(500).send({ message: "Could not accept leave application", err: err });
            } else {
                res.status(200).send({ message: "Accepted leave application!" });
            }
        });
    } else {
        res.status(404).send({ message: "No id/status received for accepting leave application."});
    }
}