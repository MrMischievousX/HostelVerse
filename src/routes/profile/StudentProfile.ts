import { Request, Response } from "express";
import { Student } from "../../models/Student";

export async function StudentProfile(req: Request, res: Response): Promise<void> {
    if(!req.body){
        res.status(400).send({ message : "Body cannot be empty!"});
        return;
    }
    if(!req.body.email){
        res.status(400).send({ message : "Email cannot be empty!"});
        return;
    }
    
    Student.findOne({ email: req.body.email })
    .then(data => { res.send(data); })
    .catch(err => { res.status(404).send("Student not found with that email!");});
}

export async function StudentProfileUpdate(req: Request, res: Response): Promise<void> {
    if(!req.body){
        res.status(400).send({ message : "Body cannot be empty!"});
        return;
    }
    const b = req.body;
    
    }
