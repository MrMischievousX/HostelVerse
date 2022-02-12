import { Request, Response } from "express";
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from "./secrets";

import cloudinary from "cloudinary";

cloudinary.v2.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_KEY, 
    api_secret: CLOUDINARY_SECRET
});

export function uploadImage(req: Request, res: Response) {
    const photo = req.files.photo;
    cloudinary.v2.uploader.upload(photo.tempFilePath, function(error, result) {
        if (error) {
            console.log(error);
            return;
        }
        res.send({
            url: result.url
        });
    });
}