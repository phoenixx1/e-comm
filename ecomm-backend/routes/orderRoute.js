const express = require("express");
const {
    newOrder,
    getMyOrders,
    getSingleOrder,
} = require("../controller/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);

module.exports = router;
