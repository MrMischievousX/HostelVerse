import { Request, Response } from "express";
import { Student, StudentDocument } from "../../models/Student";

/**
 * Create a new local account.
 * @route GET /warden/studentList
 */
export async function getStudentList (req: Request, res: Response): Promise<void> {
    const students = await Student.find({});
    res.send(students);
}