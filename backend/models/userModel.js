const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Enter valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLenght: [8, "Password minimum length should be 8 char"],
        select: false,
    },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
    role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});

// Token for login
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
