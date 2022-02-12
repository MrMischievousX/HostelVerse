import { Student } from "../../models/Student";
import { Request, Response } from "express";
import axios from "axios";
import { MAP_QUEST_KEY } from "../../util/secrets";
import { Attendence } from "../../models/Attendence";
import { sendOTPEmail } from "../../service/mailer";
import { createOTP } from "../../util/createOTP";

const college_location = "Jaipur,Rajasthan";


async function getDistance(location: string): Promise<number> {
    // const query_url = `http://www.mapquestapi.com/directions/v2/route?key=${MAP_QUEST_KEY}&unit=k&from=${location}&to=${college_location}`;
    const query_url = `http://www.mapquestapi.com/directions/v2/route?key=${MAP_QUEST_KEY}&from=${location}&to=${college_location}`;
    // console.log(query_url);
    const distance = (await axios.get(query_url)).data;
    // console.log(distance);
    const answer = distance.route.distance;
    return answer;
}
/**
 * Create a new local account.
 * @route POST /student/signup
 */
export const signupStudent = async (req: Request, res: Response) => {
    // Validate Request
    console.log("request received!");
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    // Check if user already exists with the given email
    if(await Student.findOne({ email: req.body.email })){
        res.status(400).send({ message: "Student with that email already exists!" });
        return;
    }
    const OTP = createOTP();
    const expiry = Date.now() + 60 * 1000 * 15;  //Set expiry 15 mins ahead from now
    const sendOTP = await sendOTPEmail(req.body.email, OTP);
    if (sendOTP.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send verification email.",
        });
    }
    if(await Attendence.findOne({ email: req.body.email })){
        res.status(400).send({ message: "Student with that email already exists!" });
        return;
    }
    
    const studentEntry = new Attendence({
        studentid: req.body.studentid
    });
   await studentEntry.save();

    const distance = await getDistance(req.body.location);

    const student = new Student();
    student.email = req.body.email;
    student.password = req.body.password;
    student.studentid = req.body.studentid;
    student.profile.name = req.body.name;
    student.profile.gender = req.body.gender;
    student.profile.email = req.body.email;
    student.profile.contactno = req.body.contactno;
    student.profile.location = req.body.location;
    student.emailToken = OTP;
    student.emailTokenExpires = new Date(expiry);
    student.profile.picture = student.gravatar(200);
    student.distance = distance;

    student.save()
    .then(data => {
        res.status(200).send({
            success: true,
            message: "Registration successful!",
        });
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message : err.message || "Cannot register"
        });
    });
    
};


