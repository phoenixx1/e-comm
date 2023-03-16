const express = require("express");
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getProducts);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
router
    .route("/product/:id")
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct)
    .get(getProductDetails);

module.exports = router;
