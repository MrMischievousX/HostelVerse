import { connection } from "mongoose";

export const connectFeedbackDB = async(): Promise<void> => {
    try {
        const feedbackConnection = connection.useDb("Feedback");
        console.log("MongoDB connected: Feedback collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
