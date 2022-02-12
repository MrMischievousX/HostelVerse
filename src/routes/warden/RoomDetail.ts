import { Request, Response } from "express";
import { Room } from "../../models/Room";
import { Student } from "../../models/Student";

export async function RoomDetail(req: Request, res: Response): Promise<void> {
    const students = await Student.find({});
    const rooms = await Room.find({});
    const roomDetail = [];
    for(let index = 0; index < rooms.length; index++) {
        const room = rooms[index];

        const students_in_room = students.filter(student => student.roomid === room.roomno);
        let room_detail_item = {};
        if(students_in_room.length == 0){
            room_detail_item = {
                hostelid: room.hostelid,
                roomno: room.roomno,
                allotmentstatus: room.allotmentstatus,
                studentid: room.studentid
            };
        }
        else{
            room_detail_item = {
                hostelid: room.hostelid,
                roomno: room.roomno,
                allotmentstatus: room.allotmentstatus,
                studentid: room.studentid,
                ...students_in_room[0].profile
            };
        }
        console.log(students_in_room);
        
        roomDetail.push(room_detail_item);
    }
    res.send(roomDetail);
}
