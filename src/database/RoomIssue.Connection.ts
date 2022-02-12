import { connection } from "mongoose";

export const connectRoomIssueDB = async(): Promise<void> => {
    try {
        const roomissueConnection = connection.useDb("RoomIssue");
        console.log("MongoDB connected: RoomIssue collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
