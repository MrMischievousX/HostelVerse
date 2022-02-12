// get the entries in student db where roomid and hostelid is null
// then sort the entries descending order based on distance between location of institute and student's location

import { Student, StudentDocument } from "../models/Student";
import { Hostel } from "../models/Hostel";
import { Room } from "../models/Room";
import { Request, Response } from "express";


async function getStudents(): Promise<StudentDocument[]> {
    const studentList = await Student.find({ roomid: null }, null, { sort: { distance: -1 } });
    return studentList;
}

// async function getTotalVacancies() {
//     const hostelList = await Hostel.find({}, null, { sort: { hostelid: 1 } });
//     let totalVacancies = 0;
//     for(let i = 0; i < hostelList.length; i++) {
//         const hostelid = hostelList[i].hostelid;
//         const roomList = await Room.find({ hostelid: hostelid, allotmentstatus: false });
//         totalVacancies += roomList.length;
//     }
//     return totalVacancies;
// }

export async function AllotHostel(req: Request, res: Response) {
    const studentList = await getStudents();
    let studentCounter = 0;
    const hostelList = await Hostel.find({}, null, { sort: { hostelid: 1 } });
    for(let i = 0; i < hostelList.length; i++) {
        const hostelid = hostelList[i].hostelid;
        const roomList = await Room.find({ hostelid: hostelid, allotmentstatus: false });
        for(let j = 0; j < roomList.length; j++) {  
            const roomno = roomList[j].roomno;
            if(studentCounter < studentList.length) {   
                const studentid = studentList[studentCounter].studentid;
                await Student.updateOne({ studentid: studentid }, { roomid: roomno, hostelid: hostelid });
                await Room.updateOne({ hostelid: hostelid, roomno: roomno }, { allotmentstatus: true, studentid: studentid });
                await Hostel.updateOne({ hostelid: hostelid }, { $inc: { roomsleft: -1 } });
                studentCounter++;
            }
        }
    }
    res.status(200).send("Allotment done");       
}