import { connection } from "mongoose";

export const connectAdminDB = async(): Promise<void> => {
    try {
        const adminConnection = connection.useDb("Admin");
        console.log("MongoDB connected: Admin collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
