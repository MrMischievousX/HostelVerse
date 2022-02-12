import { connection } from "mongoose";

export const connectWardenDB = async(): Promise<void> => {
    try {
        const wardenConnection = connection.useDb("Warden");
        console.log("MongoDB connected: Warden collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
