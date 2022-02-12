import { Request, Response } from "express";
import { LeaveApplication } from "../../models/LeaveApplication";

export async function createLeaveApplication(req: Request, res: Response): Promise<void> {

    const leaveApplication = new LeaveApplication();
    leaveApplication.studentid = req.body.studentid;
    leaveApplication.message = req.body.message;
    leaveApplication.date_to = new Date(req.body.date_to);
    leaveApplication.date_from = new Date(req.body.date_from);

    

    leaveApplication.save()
        .then(data => {
            res.send("Leave Application created successfully.");
        }).catch(err => res.status(500).send({ message: err.message || "An error occured while creating a leave application."}));
}