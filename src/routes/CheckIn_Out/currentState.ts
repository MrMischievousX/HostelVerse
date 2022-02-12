import { Request, Response } from "express";
import { Attendence } from "../../models/Attendence";
import { Student } from "../../models/Student";

export async function currentState(req: Request, res: Response): Promise<void> {
    const studentid = req.body.studentid;
    if (!studentid) {
        res.status(400).send({ message: "Student ID cannot be empty!" });
        return;
    }
    const student = await Student.findOne({ studentid: studentid });
    if (!student) {
        res.status(500).send("Student not found!");
        return;
    }
    Attendence.findOne({ studentid: studentid })
        .then(studentLog => {
            const last_checkin = studentLog.last_checkin;
            const last_checkout = studentLog.last_checkout;
            if (last_checkin > last_checkout || last_checkout == null) {
                res.send({ message: "Checked in" });
            } else if(last_checkin < last_checkout || (last_checkout == null && last_checkin == null)) {
                res.send({ message: "Checked out" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Student not found in Attendence DB" });
        });
}