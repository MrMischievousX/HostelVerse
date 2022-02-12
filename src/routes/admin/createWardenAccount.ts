import { Warden } from "../../models/Warden";
import { Hostel } from "../../models/Hostel";
import { Request, Response } from "express";

/**
 * Create a warden account.
 * @route POST /admin/createWardenAccount
 */
export const createWardenAccount = async (req: Request, res: Response): Promise<void> => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    // Check if user already exists with the given email
    if(await Warden.findOne({ email: req.body.email })){
        res.status(400).send({ message: "Warden with that email already exists!" });
        return;
    }
    await Hostel.updateOne({ hostelid : req.body.hostelid },{ wardenid: req.body.wardenid });

    const warden = new Warden();
    warden.email = req.body.email;
    warden.password = req.body.password;
    warden.wardenid = req.body.wardenid;
    warden.wardenname = req.body.name;
    warden.hostelid = req.body.hostelid;
    warden.profile.name = req.body.name;
    warden.profile.email = req.body.email;
    warden.profile.contactno = req.body.contactno;
    warden.profile.picture = warden.gravatar(200);
    warden.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
    
};


