import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";


export type WardenDocument = mongoose.Document & {
    wardenid: string;
    hostelid: string;
    wardenname: string;
    password: string;
    email: string;
    role: string;
    resetPasswordToken: string | null,
    resetPasswordExpires: Date | null,
    jwtToken: string | null;

    profile: {
        name: string;
        email: string;
        picture: string;
        contactno: string;
    };
    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;

};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

const WardenSchema = new mongoose.Schema<WardenDocument>(
    {
        email: { type: String, unique: true },
        password: String,
        resetPasswordToken: { type: String, default: null },
        jwtToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
        wardenid: { type: String, unique: true },
        hostelid: { type: String, $ref: "Hostel" },
        wardenname: String,
        role: {type: String, default: "warden"},
        profile: {
            name: String,
            email: String,
            picture: String,
            contactno: String
        }
    }
);

/**
 * Password hash middleware.
 */
 WardenSchema.pre("save", function save(next) {
    const user = this as WardenDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

WardenSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
 WardenSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const Warden = mongoose.model<WardenDocument>("Warden", WardenSchema);