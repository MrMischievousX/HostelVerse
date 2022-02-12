import fs from "fs";
import path from "path";
import { Student } from "../models/Student";
import passportJWT from "passport-jwt";
import { JWT_SECRET } from "../util/secrets";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const path_to_key = path.join(__dirname, "..", "/util/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(path_to_key, "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

const JWT_Student_Strategy = new JwtStrategy(options, (jwtPayload, done) => {
    Student.findOne({ _id: jwtPayload._id }).select("studentid name email")
    .then(student => {
        if(!student){
            return done(null, false);
        }
        return done(null, student);
    })
    .catch(err => {
        console.log(err);
        return done(err, false);
    });
});