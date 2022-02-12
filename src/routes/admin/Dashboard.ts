import { Request, Response } from "express";
import { Room } from "../../models/Room";
import { RoomIssue } from "../../models/RoomIssue";
import { Hostel } from "../../models/Hostel";
import { Warden } from "../../models/Warden";
import { Payment } from "../../models/Payment";

async function occupancyRate(){
    const hostels = await Hostel.find({});
    const hostelids = hostels.map(hostel => hostel.hostelid);
    const stats = [];
    
    const cursor = await Room.aggregate([
        { 
            $match: { "allotmentstatus" : true } 
        },
        { 
            $group: { 
                _id: "$hostelid" ,
                total: { $sum: 1 } 
            }
        }
    ]);
    // console.log(cursor);
    for(const hostelid of hostelids){
        let total = 0;
        for(const doc of cursor){
            if(doc._id == hostelid){
                total = doc.total;
                break;
            }
        }
        const hostel = await Hostel.findOne({ hostelid });
        const warden = await Warden.findOne({ wardenid: hostel.wardenid });
        const hostelname = hostel.hostelname;
        const wardenname = warden.wardenname;
        const occupancyrate = (total/hostel.totalrooms)*100;
        const hostelstats = { hostelname, wardenname, occupancyrate };
        stats.push(hostelstats);
    }
    return stats;
}

async function IssueClearanceRate(){
    const hostelids = (await Hostel.find({})).map(hostel => hostel.hostelid);
    const stats = [];
    for(const hostelid of hostelids){
        const warden = await Warden.findOne({ hostelid: hostelid });
        const totalIssues = await RoomIssue.countDocuments({ hostelid: hostelid });
        const solvedIssues = await RoomIssue.countDocuments({ hostelid: hostelid, status: "Solved" });
        const IssueClearanceRate = (solvedIssues/totalIssues)*100;
        stats.push({ 
            hostelid: hostelid, 
            wardenid: warden.wardenid,
            name: warden.wardenname, 
            IssueClearanceRate: IssueClearanceRate,
            totalIssues: totalIssues, 
        });
    }
    return stats;
}

async function PendingPayments(){
    const pendingPayements = await Payment.countDocuments({ status: "Pending" });
    return pendingPayements;
}

export async function getDashboard(req: Request, res: Response): Promise<void> {
    const IssueClearanceStats = await IssueClearanceRate();
    const occupancyStats = await occupancyRate();
    const pendingPayments = await PendingPayments();
    res.send({ IssueClearanceStats, occupancyStats, pendingPayments });
}