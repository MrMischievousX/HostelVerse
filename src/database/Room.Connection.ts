import { connection } from "mongoose";

export const connectRoomDB = async(): Promise<void> => {
    try {
        const roomConnection = connection.useDb("Room");
        console.log("MongoDB connected: Room collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
