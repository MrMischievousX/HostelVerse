import { connection } from "mongoose";

export const connectStudentDB = async(): Promise<void> => {
    try {
        const studnetConnection = connection.useDb("Student");
        console.log("MongoDB connected: Student collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
