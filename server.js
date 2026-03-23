const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

console.log("Trying to connect...");

// MongoDB Connection
mongoose.connect("mongodb+srv://student-course-cluster:655bO0BBHipCqmtI@student-course-cluster.llprb6r.mongodb.net/student-course-registration?retryWrites=true&w=majority&authSource=admin")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("ERROR:", err));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route → show login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});