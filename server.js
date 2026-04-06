const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("Connecting to MongoDB...");

mongoose.connect("mongodb+srv://student-course-cluster:655bO0BBHipCqmtI@student-course-cluster.llprb6r.mongodb.net/student-course-registration?retryWrites=true&w=majority&authSource=admin")
.then(()=>console.log("MongoDB Atlas Connected"))
.catch(err=>console.log(err));

/* ROUTES */

// Login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Register page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Home page
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Courses page
app.get("/courses", (req,res)=>{
    res.sendFile(path.join(__dirname,"views","courses.html"));
});

// My Courses
app.get("/mycourses", async (req,res)=>{
    const email = req.query.email;

    if(!email){
        return res.sendFile(path.join(__dirname,"views","mycourses.html"));
    }

    const student = await Student.findOne({ email });

    if(!student){
        return res.json([]);
    }

    res.json(student.courses);
});

// Profile
app.get("/profile",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","profile.html"));
});

// Register
app.post("/register", async (req, res) => {

    const { name, email, phone, password } = req.body;

    const newStudent = new Student({
        name,
        email,
        phone,
        password,
        courses: []
    });

    await newStudent.save();

    res.redirect("/");
});

// Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });

    if(student){
        res.redirect("/home");
    } else {
        res.send("Invalid Email or Password");
    }
});

// Enroll
app.post("/enroll", async (req,res)=>{

    const { email, course } = req.body;

    await Student.updateOne(
        { email: email },
        { $addToSet: { courses: course } }
    );

    res.redirect("/courses");
});

// Drop Course
app.post("/dropcourse", async (req,res)=>{

    const { email, course } = req.body;

    await Student.updateOne(
        { email: email },
        { $pull: { courses: course } }
    );

    res.send("Course Dropped");
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});