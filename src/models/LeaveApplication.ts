import mongoose from "mongoose";

export type LeaveApplicationDocument = mongoose.Document & {
    studentid: string;
    message: string;
    date_from: Date;
    date_to: Date;
    status: string;
};

const LeaveApplicationSchema = new mongoose.Schema<LeaveApplicationDocument>(
    {
        studentid: String,
        message: String,
        date_to: Date,
        date_from: Date,
        status: { type: String, default: "Pending" }
    }
);

export const LeaveApplication = mongoose.model<LeaveApplicationDocument>("LeaveApplication", LeaveApplicationSchema);