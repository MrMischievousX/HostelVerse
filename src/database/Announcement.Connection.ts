import { connection } from "mongoose";

export const connectAnnouncementDB = async(): Promise<void> => {
    try {
        const announcementConnection = connection.useDb("Announcement");
        console.log("MongoDB connected: Announcement collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
