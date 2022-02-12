import { Request, Response } from "express";
import { Student } from "../../models/Student";

export async function removeStudent(req: Request, res: Response){
    if(!req.body){
        res.status(400).send({ message : "Body cannot be empty!"});
        return;
    }
    if(!req.body.studentid){
        res.status(400).send({ message : "Studentid cannot be empty!"});
        return;
    }
    Student.findOneAndDelete({ studentid: req.body.studentid })
    .then(data => { res.send({
        sucess: true,
        message: "Student deleted successfully!"
        }); 
    })
    .catch(err => { res.status(404).send("Student not found with that studentid!");});
}