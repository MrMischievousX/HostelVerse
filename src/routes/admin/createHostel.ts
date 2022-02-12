import { Hostel } from "../../models/Hostel";
import { Request, Response } from "express";

/**
 * Create a hostel entry
 * @route POST /admin/createhostel
 */
export const createHostel = async (req: Request, res: Response): Promise<void> => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }


    const hostel = new Hostel();
    hostel.hostelid = req.body.hostelid;
    hostel.hostelname = req.body.name;
    hostel.location = req.body.location;
    hostel.fees = req.body.fees;
    if(req.body.wardenid){
        hostel.wardenid = req.body.wardenid;
    }
    hostel.totalrooms = req.body.totalrooms;
    hostel.roomsleft = req.body.totalrooms;
    hostel.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
    
};


