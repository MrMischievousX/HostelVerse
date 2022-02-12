# HostelVerse
# Routes

## Admin Login
### /admin/login
#### Schema
- email
- password

---

## Student Login
### /student/login
#### Schema
- email
- password

### /student/signup
#### Schema
- email
- studentid
- name
- password
- location
- contactno
- gender 

---

## Warden Login
### /warden/login
#### Schema
- email
- password

---

## Admin Create
### /admin/createWardenAccount
#### Schema
- email 
- password 
- wardenid 
- name 
- hostelid 
- contactno 
- gender 

### /admin/createhostel
#### Schema
- hostelid
- name
- location
- totalrooms

### /admin/createroom
#### Schema
- hostelid 
- roomno 

---

## Profile
### /student/profile
#### Schema
- email 

### /warden/profile
#### Schema
- email 

### /admin/profile
#### Schema
- email 

---

### /getHostelList
#### Schema
- No Schema

### /student/checkin/${studentid}
#### Schema
- studentid

### /student/checkout/${studentid}
#### Schema
- studentid

---

### /warden/studentList
#### Schema
- No Schema

### /warden/roomDetail
#### Schema
- No Schema

### /warden/studentAttendence
#### Schema
- No Schema

---