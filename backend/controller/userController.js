const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;
    userModel
        .create({
            name,
            email,
            password,
            avatar: { public_id: "1", url: ".com" },
        })
        .then((user) => {
            sendToken(user, 201, res);
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: err.message });
        });
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    // check if both given
    if (!email || !password) {
        return new ErrorHandler("Please enter email and password", 400);
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged Out" });
};

exports.getUserDetails = async (req, res, next) => {
    const user = await userModel.findById(req.body.id);
    res.status(200).json({ success: true, user });
};
