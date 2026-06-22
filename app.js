const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Headphones",
        price: 2500,
        category: "Accessories",
    },
];

// Home route
app.get("/", (req, res) => {
    res.send("Codveda Level 1 Task 2 - Simple REST API");
});

// READ all products
app.get("/products", (req, res) => {
    res.status(200).json({
        success: true,
        data: products,
    });
});

// READ single product
app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        data: product,
    });
});

// CREATE product
app.post("/products", (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "Name, price, and category are required",
        });
    }

    const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        category,
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
    });
});

// UPDATE product
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
});

// DELETE product
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    products = products.filter((p) => p.id !== Number(id));

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});