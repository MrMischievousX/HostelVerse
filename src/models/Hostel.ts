import mongoose from "mongoose";

export type HostelDocument = mongoose.Document & {
    hostelid: string;
    hostelname: string;
    location: string;
    wardenid: string;
    totalrooms: number;
    roomsleft: number;
    fees: number;
};

const HostelSchema = new mongoose.Schema<HostelDocument>(
    {
        hostelid: { type: String, unique: true },
        hostelname: String,
        location: String,
        wardenid: String,
        totalrooms: Number,
        roomsleft: Number,
        fees: Number
    }
);

export const Hostel = mongoose.model<HostelDocument>("Hostel", HostelSchema);