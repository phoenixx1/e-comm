const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login to access this api", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedData.id);
    next();
};
