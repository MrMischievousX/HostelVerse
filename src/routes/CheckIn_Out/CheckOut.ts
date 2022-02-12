import { Request, Response } from "express";
import { Student } from "../../models/Student";
import { Attendence } from "../../models/Attendence";

export const StudentCheckOut = async (req:Request, res: Response): Promise<void> => {
    const studentid = req.body.studentid;
    if(!studentid){
        res.status(400).send({ message : "Student ID cannot be empty!"});
        return;
    }
    const student = await Student.findOne({ studentid: studentid });
    if(!student) {
        res.status(500).send("Student not found!");
        return;
    }
    Attendence.findOne({ studentid: studentid})
    .then(studentLog => {
        const last_checkin = studentLog.last_checkin;
        const last_checkout = studentLog.last_checkout;
        if(last_checkin > last_checkout) {
            Attendence.updateOne({ studentid: studentid }, { last_checkout: new Date() })
            .then(data => {
                res.send({ messgae: "Checked Out successfully!"});
            })
            .catch(err => {
                res.status(500).send({ message: "Error occured while checking out!"});
            });
        }
        else{
            res.status(400).send({ message: "You have already checked out!"});
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Student not found in Attendence DB"});
    });
};
