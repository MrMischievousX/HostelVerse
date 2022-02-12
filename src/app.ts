import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import fileupload from "express-fileupload";
// MongoDB Imports
import { connectHostel } from "./database/Hostel.Connectiion";
import { connectAdminDB } from "./database/Admin.Connection";
import { connectAnnouncementDB } from "./database/Announcement.Connection";
import { connectAttendenceDB } from "./database/Attendence.Connection";
import { connectFeedbackDB } from "./database/Feedback.Connection";
import { connectPaymentDB } from "./database/Payment.Connection";
import { connectRoomDB } from "./database/Room.Connection";
import { connectRoomIssueDB } from "./database/RoomIssue.Connection";
import { connectStudentDB } from "./database/Student.Connection";
import { connectWardenDB } from "./database/Warden.Connection";

// import { limiter } from "./middleware/rateLimit";
import "./config/PassportStudent";
import "./config/passportWarden";
import "./config/passportAdmin";
import { route } from "./routes/router";

// Create Express server
const app = express();

// Connect to MongoDB Databases
connectHostel();
connectAdminDB();
connectAnnouncementDB();
connectAttendenceDB();
connectFeedbackDB();
connectPaymentDB();
connectRoomDB();
connectRoomIssueDB();
connectStudentDB();
connectWardenDB();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(helmet());
app.use(fileupload({
    useTempFiles: true
}));
// app.use(limiter);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use("/", route);


export default app;
