import { Request, Response } from "express";
import { Attendence } from "../../models/Attendence";

function isToday(date: Date) {
    return date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
}
export async function StudentAttendence(req: Request, res: Response): Promise<void> {
    const studentEntries = await Attendence.find({});
    const dailyStudentAttendence = [];
    for(let index = 0; index < studentEntries.length; index++){
        const studentEntry = studentEntries[index];
        const student_id = studentEntry.studentid;
        const last_checkin = studentEntry.last_checkin;
        const last_checkout = studentEntry.last_checkout;
        let attendence = "";
        if(last_checkin == null || last_checkout == null){
            attendence = "Absent";
        }
        if(!isToday(last_checkin) || !isToday(last_checkout)){
            attendence = "Absent";
        }
        else if(last_checkout > last_checkin){
            attendence = "Absent";
        }
        else if(last_checkin.getHours() >= 21){
            attendence = "Absent";
        }
        else{
            attendence = "Present";
        }
        dailyStudentAttendence.push({student_id, attendence});
    }
    res.send(dailyStudentAttendence);
}