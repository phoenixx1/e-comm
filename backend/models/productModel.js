const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], trim: true },
    description: { type: String, required: [true, "Product desc is required"] },
    price: { type: Number, required: [true, "Set Product price"] },
    rating: { type: Number, default: 0 },
    images: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    category: { type: String, required: [true, "Specify product category  "] },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
