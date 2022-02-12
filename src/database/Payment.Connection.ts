import { connection } from "mongoose";

export const connectPaymentDB = async(): Promise<void> => {
    try {
        const paymentConnection = connection.useDb("Payment");
        console.log("MongoDB connected: Payment collection connected!");
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};
