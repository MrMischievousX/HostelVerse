import { Request, Response } from "express";
import { Hostel } from "../../models/Hostel";

export async function getHostelList(req: Request, res: Response): Promise<void> {
    const hostelList = await Hostel.find({}, null, { sort: { hostelid: 1 } }).select("hostelid hostelname location totalrooms roomsleft fees wardenid");
   res.send(hostelList);
}