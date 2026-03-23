const express = require('express');
const mongoose = require('mongoose');

const app = express();
console.log("Trying to connect...");
// MongoDB Connection
mongoose.connect("mongodb+srv://student-course-cluster:655bO0BBHipCqmtI@student-course-cluster.llprb6r.mongodb.net/student-course-registration?retryWrites=true&w=majority&authSource=admin")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("ERROR:", err));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route
app.get('/', (req, res) => {
    res.send("Student Course Registration System Running");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});