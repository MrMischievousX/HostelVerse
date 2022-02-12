import { Request, Response } from "express";
import { Admin } from "../../models/Admin";
import bcrypt from "bcrypt-nodejs";

/**
 * View admin profile
 * @route Get /admin/profile
 */
export async function AdminProfile(req: Request, res: Response): Promise<void> {
    if(!req.body.email){
        res.status(400).send({ message : "Email cannot be empty!"});
        return;
    }
    Admin.findOne({ email: req.body.email })
    .then(data => { res.send(data); })
    .catch(err => { res.send(404).send("Warden not found with that email!");});
}

/**
 * Update admin credentials
 * @route Patch /admin/profile
 */

export async function UpdateAdminProfile(req: Request, res: Response): Promise<void> {
    if(!req.body.email || !req.body.password){
        res.status(400).send({ message : "Email/Password cannot be empty!"});
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const HashedPassword = bcrypt.hashSync(req.body.password, salt);

    Admin.findOneAndUpdate({ email: req.body.email }, { $set: { password: HashedPassword, name: req.body.name } }, { useFindAndModify: false} , (err, doc) => {
        if (err) {
            res.status(500).send({ message: "Admin not found!", err: err });
        } else {
            res.status(200).send("Password updated!");
        }
    });
}

/**
 * Create Default Admin
 * @route POST /admin/profile
 */

 export async function defaultAdmin(req: Request, res: Response): Promise<void> {
    if(!req.body.email || !req.body.password){
        res.status(400).send({ message : "Email/Password cannot be empty!"});
        return;
    }
    const admin = new Admin();
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save()
    .then(data => {
        res.send({ message: "Admin created successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: "Error creating admin!", err: err });
    });
}