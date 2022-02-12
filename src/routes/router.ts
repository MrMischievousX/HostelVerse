import { Router } from "express";
import { AllotHostel } from "../service/HostelAllotment";
import { sendOTPEmail } from "../service/mailer";
import { resendOTP } from "../service/resendOTP";
import { createHostel } from "./admin/createHostel";
import { createRoom } from "./admin/createRoom";
import { createWardenAccount } from "./admin/createWardenAccount";
import { getDashboard } from "./admin/Dashboard";
import { viewFeedback } from "./admin/Feedback";
import { viewWarden } from "./admin/WardenList";
import { StudentCheckIn } from "./CheckIn_Out/CheckIn";
import { StudentCheckOut } from "./CheckIn_Out/CheckOut";
import { getHostelList } from "./HostelList/getHostList";
import { AdminLogin } from "./login/Admin.Login";
import { Login } from "./login/Login";
import { StudentLogin } from "./login/Student.Login";
import { WardenLogin } from "./login/Warden.login";
import { getPaymentDetails } from "./payments/paymentDetail";
import { AdminProfile, defaultAdmin, UpdateAdminProfile } from "./profile/AdminProfile";
import { StudentProfile } from "./profile/StudentProfile";
import { WardenProfile } from "./profile/WardenProfile";
import { activateAccount } from "./signup/activateAccount";
import { signupStudent } from "./signup/Student.Signup";
import { createFeedback } from "./student/Feedback";
import { createLeaveApplication } from "./student/leaveApplication";
import { createRoomIssue } from "./student/roomIssue";
import { viewAnnouncement } from "./student/viewAnnouncement";
import { createAnnouncement } from "./warden/announcement";
import { acceptLeaveApplication, getLeaveApplications } from "./warden/leaveApplication";
import { RoomDetail } from "./warden/RoomDetail";
import { getRoomIssues, resolveRoomIssue } from "./warden/roomIssue";
import { getStudentList } from "./warden/StudenList";
import { StudentAttendence } from "./warden/StudentAttendence";
export const route: Router = Router();

route.get("/allotHostel", AllotHostel);
route.get("/getHostelList", getHostelList);

// signup routes
route.post("/signup", signupStudent);

route.post("/activate", activateAccount);

// login routes
route.post("/login", Login);

// admin routes
route.post("/admin/createWardenAccount", createWardenAccount);
route.post("/admin/createhostel", createHostel);
route.post("/admin/createroom", createRoom);

// Get Profiles
route.post("/admin/profile", AdminProfile);
route.post("/warden/profile", WardenProfile);
route.patch("/admin/profile", UpdateAdminProfile);
route.post("/student/profile", StudentProfile);

// Student Check In/Out
route.post("/student/checkin/", StudentCheckIn);
route.post("/student/checkout/", StudentCheckOut);

// warden routes
route.get("/warden/studentList", getStudentList);
route.get("/warden/roomDetail", RoomDetail);
route.get("/warden/studentAttendence", StudentAttendence);

route.post("/student/createRoomIssue", createRoomIssue);
route.post("/student/createLeaveApplication", createLeaveApplication);
route.get("/student/announcement", viewAnnouncement);

route.post("/student/Feedback", createFeedback);

route.post("/warden/RoomIssues", getRoomIssues);
route.patch("/warden/RoomIssues", resolveRoomIssue);
route.post("/warden/LeaveApplications", getLeaveApplications);
route.patch("/warden/LeaveApplications", acceptLeaveApplication);

route.post("/warden/announcement", createAnnouncement);
route.get("/admin/viewFeedback", viewFeedback);
route.get("/admin/Dashboard", getDashboard);
route.get("/admin/viewWarden", viewWarden);
route.get("/paymentDetails", getPaymentDetails);
route.post("/admin/profile", defaultAdmin);

route.post("/resendOTP", resendOTP);