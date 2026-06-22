const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Codveda Level 1 Task 1 - Development Environment Setup Complete");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});