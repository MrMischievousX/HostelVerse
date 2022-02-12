import mongoose from "mongoose";

export type PaymentDocument = mongoose.Document & {
    studentid: string;
    accountno: string;
    paymentamount: number;
    duedate: Date;
    transactionstatus: string;
    purpose: string;
};

const PaymentSchema = new mongoose.Schema<PaymentDocument>(
    {
        studentid: { type: String, $ref: "Student" },
        accountno: String,
        paymentamount: Number,
        duedate: Date,
        transactionstatus: String,
        purpose: String
    }
);

export const Payment = mongoose.model<PaymentDocument>("Payment", PaymentSchema);