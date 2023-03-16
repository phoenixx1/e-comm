const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder = (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    orderModel
        .create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        })
        .then((order) => {
            res.status(201).json({ success: true, order });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: err.message });
        });
};

exports.getSingleOrder = async (req, res, next) => {
    const order = await orderModel
        .findById(req.params.id)
        .populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    res.status(200).json({ success: true, order });
};

exports.getMyOrders = async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler("Order not found", 404));
    }
    res.status(200).json({ success: true, orders });
};

exports.getAllOrders = async (req, res, next) => {
    const orders = await orderModel.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    if (!orders) {
        return next(new ErrorHandler("Order not found", 404));
    }
    res.status(200).json({ success: true, totalAmount, orders });
};
