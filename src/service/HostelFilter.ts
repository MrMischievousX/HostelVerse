import { Hostel } from "../models/Hostel";

export async function filterByFees(low: number, high: number){
    const hostelList = await Hostel.find({}, null, { sort: { hostelid: 1 } }).select("hostelid hostelname location totalrooms roomsleft fees wardenid");
    const filteredList = hostelList.filter(hostel => hostel.fees >= low && hostel.fees <= high);
    return filteredList;
}