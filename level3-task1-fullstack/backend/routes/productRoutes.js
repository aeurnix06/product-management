const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// Add product (Admin only)
router.post("/", authMiddleware, adminOnly, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to add product" });
    }
});

// Update product (Admin only)
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
    }
});

// Delete product (Admin only)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
});

module.exports = router;