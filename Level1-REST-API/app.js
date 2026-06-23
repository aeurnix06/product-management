const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const JWT_SECRET = "codveda_secret_key";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let users = [];
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

// JWT middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

// Role authorization middleware
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  next();
}

// Home route
app.get("/", (req, res) => {
  res.send("Codveda Level 2 Task 2 - JWT Authentication and Authorization");
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, and password are required",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });
});

// Protected user profile route
app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected profile accessed successfully",
    user: req.user,
  });
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

// CREATE product - protected
app.post("/products", verifyToken, (req, res) => {
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

// UPDATE product - protected
app.put("/products/:id", verifyToken, (req, res) => {
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

// DELETE product - admin only
app.delete("/products/:id", verifyToken, authorizeAdmin, (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});