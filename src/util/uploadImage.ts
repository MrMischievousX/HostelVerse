import { Request, Response } from "express";
import { CLOUDINARY_NAME } from "./secrets";

import cloudinary from "cloudinary";

cloudinary.v2.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: '726876361713356', 
    api_secret: 'ZqmfrAKYPnnswUvV2gp_5Njp_jQ' 
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