import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";

export type StudentDocument = mongoose.Document & {
    studentid: string;
    roomid: string | null;
    hostelid: string | null;
    password: string;
    email: string;
    distance: number;
    role: string;
    emailToken: number | null;
    emailTokenExpires: Date | null;
    resetPasswordToken: string | null,
    resetPasswordExpires: Date | null,
    jwtToken: string | null;
    active: boolean;
    profile: {
        name: string;
        gender: string;
        email: string;
        picture: string;
        contactno: string;
        location: string;
    };
    comparePassword: comparePasswordFunction;
    // createToken: createTokenFunction;
    gravatar: (size: number) => string;

};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

// type createTokenFunction = ()

const StudentSchema = new mongoose.Schema<StudentDocument>(
    {
        email: { type: String, unique: true },
        password: String,
        roomid: String,
        hostelid: String,
        studentid : { type: String, unique: true },
        distance: Number,
        emailToken: { type: Number, default: null },
        emailTokenExpires: { type: Date, default: null },
        resetPasswordToken: { type: String, default: null },
        jwtToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
        role : {type: String, default: "student"},
        active: { type: Boolean, default: false },
        profile: {
            name: String,
            gender: String,
            email: String,
            picture: String,
            contactno: String,
            location: String,
        }
    }
);

/**
 * Password hash middleware.
 */
 StudentSchema.pre("save", function save(next) {
    const user = this as StudentDocument;
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

// const createToken = function (){
//     return jwt.sign(
//         {

//         }
//     )
// }

StudentSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
StudentSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const Student = mongoose.model<StudentDocument>("Student", StudentSchema);