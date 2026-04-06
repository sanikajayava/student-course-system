const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    courses: [String]
});

module.exports = mongoose.model("Student", studentSchema);