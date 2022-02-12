import mongoose from "mongoose";

export type HostelDocument = mongoose.Document & {
    hostelid: string;
    hostelname: string;
    location: string;
    wardenid: string;
    totalrooms: number;
    roomsleft: number;
    fees: number;
    description: string;
    roomtype: string;
    overallRating: number;
    numberOfReviews: number;
    image: string;
};

const HostelSchema = new mongoose.Schema<HostelDocument>(
    {
        hostelid: { type: String, unique: true },
        hostelname: String,
        location: String,
        wardenid: String,
        totalrooms: Number,
        roomsleft: Number,
        fees: Number,
        description: String,
        roomtype: { type: String, default: "Single" },
        overallRating: { type: Number, default: 0 },
        numberOfReviews: { type: Number, default: 0 },
        image: String
    }
);

export const Hostel = mongoose.model<HostelDocument>("Hostel", HostelSchema);