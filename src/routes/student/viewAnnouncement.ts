import { Request, Response } from "express";
import { Announcement } from "../../models/Announcement";
import { Student }  from "../../models/Student";

export async function viewAnnouncement(req: Request, res: Response): Promise<void> {

    if(!req.body.studentid) {
        res.status(400).send({ message: "No student id received! "});
    }

    Student.findOne({ studentid: req.body.studentid })
        .then(student => {
            Announcement.find({ hostelid: student.hostelid }, null, { sort: { createdAt: 1 } })
        .then(data => {
            res.send(data);
        }).catch(err => res.status(500).send({ message: err.message }));
        }).catch(err => res.status(500).send({ message: "Student not exists with this id."}));
    
}