const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const Features = require("../utils/features");

exports.createProduct = (req, res) => {
    productModel
        .create(req.body)
        .then((product) => {
            res.status(201).json({ success: true, product });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: err });
        });
};

exports.getProducts = async (req, res) => {
    const resultPerPage = 6;
    const productCount = await productModel.countDocuments();
    const apiFeature = new Features(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const product = await apiFeature.query
        .then((products) => {
            res.status(200).json({ success: true, products, productCount });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Error fetching products",
                error: err,
            });
        });
};

exports.getProductDetails = async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    productModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then((product) => {
            res.status(201).json({ success: true, product });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Error updating product",
                error: err,
            });
        });
};

exports.deleteProduct = async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await product
        .deleteOne()
        .then(() => {
            res.status(201).json({ success: true, message: "Deleted product" });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Error deleting product",
                error: err,
            });
        });
};
