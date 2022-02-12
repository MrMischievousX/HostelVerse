import { connection } from "mongoose";

export const connectAttendenceDB = async(): Promise<void> => {
    try {
        const attendenceConnection = connection.useDb("Attendence");
        console.log("MongoDB connected: Attendence collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
