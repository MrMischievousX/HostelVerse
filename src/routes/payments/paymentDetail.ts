import { Request, Response } from "express";
import { Payment } from "../../models/Payment";

export async function getPaymentDetails(req: Request, res: Response): Promise<void> {
    const payment = await Payment.find();
    res.send(payment);
}