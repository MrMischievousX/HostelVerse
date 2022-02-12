import { Request, Response } from "express";
import { filterByFees } from "../../service/HostelFilter";

export async function hostelFilterByFees(req: Request, res: Response): Promise<void> {
    const b = req.body;
    if(!b){
        res.status(400).send({
            error: true,
            message: "Send request body!"
        });
        return;
    }

    const low = b.low;
    const high = b.high;
    if(!low || !high){
        res.status(400).send({
            error: true,
            message: "Please make a valid request!"
        });
        return;
    }
    const HostelList = await filterByFees(+low, +high);
    res.status(200).send({
        success: true,
        HostelList: HostelList
    });

}
