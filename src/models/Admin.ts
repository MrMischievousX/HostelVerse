import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";


export type AdminDocument = mongoose.Document & {
    adminid: string;
    password: string;
    email: string;
    name: string;
    role: string;
    resetPasswordToken: string | null,
    resetPasswordExpires: Date | null,
    jwtToken: string | null;
    
    profile: {
        name: string;
        email: string;
        picture: string;
    };
    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;

};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

const AdminSchema = new mongoose.Schema<AdminDocument>(
    {
        email: { type: String, unique: true },
        password: String,
        adminid: { type: String, unique: true },
        resetPasswordToken: { type: String, default: null },
        jwtToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
        role: {type: String, default: "admin"},
        profile: {
            name: String,
            email: String,
            picture: String,
        }
    }
);

/**
 * Password hash middleware.
 */
AdminSchema.pre("save", function save(next) {
    const user = this as AdminDocument;
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

AdminSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
AdminSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);