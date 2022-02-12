import { Request, Response } from "express";
import { Announcement } from "../../models/Announcement";

export async function createAnnouncement(req: Request, res: Response): Promise<void> {

    const announcement = new Announcement();
    announcement.hostelid = req.body.hostelid;
    announcement.wardenid = req.body.wardenid;
    announcement.heading = req.body.heading;
    announcement.message = req.body.message;

    announcement.save()
        .then(data => {
            res.send({ message: "Announcement created successfully." });
        }).catch(err => res.status(500).send({ message: err.message || "An error occured while creating announcement."}));
}